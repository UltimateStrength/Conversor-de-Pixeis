//Constantes

const grid = document.getElementById('grid');
const outputField = document.getElementById('output');
const drawButton = document.getElementById('drawButton');
const blackPixels = [];

//Criando a Malha e Definindo Tamanho

for (let i = 0; i < 128 * 64; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
}

//Código para Pintar

const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
    cell.addEventListener('mousedown', function (event) {
        if (event.button === 0) {
            // Botão Esquerdo = Pixel Preto
            this.style.backgroundColor = 'black';
            
            // Registro de Pixel Preto (no Array)

            const x = index % 128;
            const y = Math.floor(index / 128);
            blackPixels.push({ x, y });
        } else if (event.button === 2) {

            // Botão Direito = Pixel Branco

            this.style.backgroundColor = 'white';
            // Registro de Pixel Branco (Remoção de Pixel e no Array)

            const x = index % 128;
            const y = Math.floor(index / 128);
            blackPixels.splice(blackPixels.findIndex(pixel => pixel.x === x && pixel.y === y), 1);
        }
    });
});

// Botão de Saida de Códigos

drawButton.addEventListener('click', function () {
    const output = blackPixels.map(pixel => `display.drawPixel(${pixel.x}, ${pixel.y}, 'BLACK');`).join('\n');
    outputField.value = output;
});
