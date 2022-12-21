let running = false;
let size = 20;

function trigger() {
    if (this.className.includes('dead')){
        this.className = 'cell alive';
    } else {
        this.className = 'cell dead';
    }
}

function iterate() {
    let cells = document.getElementById('world').children;
    let statuses = [];
    for (let c = 0; c < cells.length; c++) {
        let cell = cells[c];
        let neighbours = 0;
        // check above
        if (c-size >= 0 && cells[c-size].className.includes('alive')) 
            neighbours++;
        // check below
        if (c+size < cells.length && cells[c+size].className.includes('alive'))
            neighbours++;
        // check left
        if (c-1 >= 0 && cells[c-1].className.includes('alive'))
            neighbours++;
        // check right
        if (c+1 < cells.length && cells[c+1].className.includes('alive'))
            neighbours++;
        // check top left
        if (c-size+1 >= 0 && cells[c-size+1].className.includes('alive'))
            neighbours++;
        // check top right
        if (c-size-1 >= 0 && cells[c-size-1].className.includes('alive'))
            neighbours++;
        // check bottom left
        if (c+size-1 < cells.length && cells[c+size-1].className.includes('alive'))
            neighbours++;
        // check bottom right
        if (c+size+1 < cells.length && cells[c+size+1].className.includes('alive'))
            neighbours++;
        // update cell status
        let status = 'cell dead';
        if (cell.className.includes('alive')) {
            if (neighbours === 2 || neighbours === 3)
                status = 'cell alive';
        } else if (neighbours === 3)
            status = 'cell alive';
        statuses.push(status);
    }
    for (let c = 0; c < cells.length; c++) {
        cells[c].className = statuses[c];
    }

    if (running) {
        setTimeout(() => {
            iterate();
        }, 500)
    }
}

function stop() {
    running = false;
    let cells = document.getElementById('world').children;
    for (let c = 0; c < cells.length; c++) {
        cells[c].className = 'cell dead';
    }
}

$(document).ready(function() {
    let numCells = size**2;
    let world = document.getElementById('world');
    for (let c = 0; c < numCells; c++) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell dead');
        cell.addEventListener('click', trigger);
        world.appendChild(cell);
    }

    document.getElementById('start').addEventListener('click', () => {
        running = true;
        iterate();
    });
    document.getElementById('reset').addEventListener('click', stop);
});

// TODO:
// - implement main functionallity obvisouly
// - set the cell color based on how many neighbours it has
// -- blue == none, green == will live, red == will die

// Bugs
// - the way we are checking neibourghs is broken on borders
// -- need to somehow check if 