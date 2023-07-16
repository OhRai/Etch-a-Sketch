const gridContainer = document.getElementById('gridbox-container');
const colorContainer = document.querySelector('.current-color')
const blackButton = document.querySelector('#black');
const randomButton = document.querySelector('#random');
const clearButton = document.querySelector('#clear');
const slider = document.querySelector('.slider');
const gridText = document.querySelector('.grid-size')

blackButton.addEventListener('click', btnClick);
randomButton.addEventListener('click', btnClick);
clearButton.addEventListener('click', clearGrid);

colorContainer.style.backgroundColor = '#333333';

let drawingColor = '#333333';
let drawingType = 'black';

let gridSize = 16;
slider.oninput = () => {
    gridSize = slider.value;
    gridText.textContent = `Grid Size: ${gridSize}x${gridSize}`;
    clearGrid();
}

let selectedButton = blackButton;
selectedButton.style.backgroundColor = '#9fb1e0';

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
        gridbox.style.backgroundColor = drawingColor; 

        switch (drawingType) {
            case 'black':
                drawingColor = '#333333'
                break;

            case 'random':
                let red = Math.floor(Math.random() * 256);
                let green = Math.floor(Math.random() * 256);
                let blue = Math.floor(Math.random() * 256);
                drawingColor = `rgb(${red}, ${green}, ${blue})`;
                break;
        }
    } 
}

function btnClick (event) {
    const buttonId = event.target.id;
    const button = document.getElementById(buttonId)

    // Change it to default button color if it isn't selected
    if (selectedButton && selectedButton !== button) {
        selectedButton.style.backgroundColor = '#facd8a';
    }
    
    button.style.backgroundColor = '#9fb1e0';
    selectedButton = button;

    switch(buttonId) {
        case 'black':
            drawingType = 'black'
            colorContainer.textContent = '';
            colorContainer.style.backgroundColor = '#333333';
            colorContainer.style.transitionDuration = '0.2s';
            break;

        case 'random':
            drawingType = 'random'
            colorContainer.textContent = '?';
            colorContainer.style.backgroundColor = '';
            colorContainer.style.transitionDuration = '0.2s';
            break;
    }
}

function clearGrid() {
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild)
    }
    createGridbox(gridSize)
}

createGridbox(gridSize);