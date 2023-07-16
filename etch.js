const gridContainer = document.getElementById('gridbox-container')

let isDrawing = false;
document.body.onmousedown = () => {isDrawing = true}
document.body.onmouseup = () => {isDrawing = false}

function createGridbox(numGrids) {
    gridContainer.style.gridTemplateColumns = `repeat(${numGrids}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${numGrids}, 1fr)`;

    for (let i = 0; i < numGrids*numGrids; i++) {
        let gridbox = document.createElement('div');
        gridbox.classList.add('grid-element');
        gridbox.style.border = '1px dashed white';
        gridbox.addEventListener('mouseover', draw);
        gridContainer.appendChild(gridbox);
    }
}

function draw(event) {
    if (isDrawing) {
        let gridbox = event.target;
            gridbox.style.border = 'none';
            gridbox.style.backgroundColor = '#333333'; 
    } 
}

createGridbox(16);