let running = false;
let size = 120;

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
        // Only check left neighbours if not on left border
        if (c % size !== 0) {
            // check top left
            if (c - size - 1 >= 0 && cells[c-size-1].className.includes('alive'))
                neighbours++;
            // check left
            if (c - 1 >= 0 && cells[c-1].className.includes('alive'))
                neighbours++;
            // check bottom left
            if (c + size - 1 < cells.length && cells[c+size-1].className.includes('alive'))
                neighbours++;
        }
        // Only check right neighbours if not on right border
        if ((c + 1) % size !== 0) {
            // check right
            if (c + 1 < cells.length && cells[c+1].className.includes('alive'))
                neighbours++;
            // check top right
            if (c - size + 1 >= 0 && cells[c-size+1].className.includes('alive'))
                neighbours++;
            // check bottom right
            if (c + size + 1 < cells.length && cells[c+size+1].className.includes('alive'))
                neighbours++;
        }

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

    if (running && statuses.includes('cell alive')) {
        setTimeout(() => {
            iterate();
        }, 500)
    }
}

function togglePause() {
    running = !running;
    if (running) iterate();
}

function stop() {
    running = false;
    document.getElementById('start').setAttribute('style', 'display: grid;');
    document.getElementById('pause').setAttribute('style', 'display: none;');
    let cells = document.getElementById('world').children;
    for (let c = 0; c < cells.length; c++) {
        cells[c].className = 'cell dead';
    }
}

$(document).ready(function() {
    document.getElementById('world').setAttribute('style',
        `width: ${14.8*size}px;
        grid-template-columns: repeat(${size}, 1fr);`
    );
    let numCells = size**2;
    let world = document.getElementById('world');
    for (let c = 0; c < numCells; c++) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell dead');
        cell.addEventListener('click', trigger);
        world.appendChild(cell);
    }

    document.getElementById('start').addEventListener('click', () => {
        document.getElementById('start').setAttribute('style', 'display: none;');
        document.getElementById('pause').setAttribute('style', 'display: grid;');
        running = true;
        iterate();
    });
    document.getElementById('pause').addEventListener('click', togglePause);
    document.getElementById('reset').addEventListener('click', stop);
});

// TODO:
// - implement main functionallity obvisouly
// - set the cell color based on how many neighbours it has
// -- blue == none, green == will live, red == will die

// Bugs
// - the way we are checking neibourghs is broken on borders
// -- need to somehow check if 