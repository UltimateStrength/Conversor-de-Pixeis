//Constantes

const grid = document.getElementById('grid');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');
const inputCode = document.getElementById('inputCode');
const pasteButton = document.getElementById('pasteButton');
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
            // Botão Esquerdo = Pixel Azul
            this.style.backgroundColor = '#3fd2e0';
            
            // Registro de Pixel Azul (no Array)

            const x = index % 128;
            const y = Math.floor(index / 128);
            blackPixels.push({ x, y });
        } else if (event.button === 2) {

            // Botão Direito = Pixel Preto

            this.style.backgroundColor = '#000000';
            // Registro de Pixel Preto (Remoção de Pixel e no Array)

            const x = index % 128;
            const y = Math.floor(index / 128);
            blackPixels.splice(blackPixels.findIndex(pixel => pixel.x === x && pixel.y === y), 1);
        }
    });
});

// Botão de Saida de Códigos com Copia

copyButton.addEventListener('click', function () {
    const output = blackPixels.map(pixel => `display.drawPixel(${pixel.x}, ${pixel.y}, SSD1306_WHITE);`).join('\n');

    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = output;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    alert('Código Copiado para a Área de Transferência.');
});

// Botão de Colar Códigos

pasteButton.addEventListener('click', function () {

    // Caixa de Dialogo

    const code = prompt('Cole o Código Aqui:');
    if (code) {

        const codeLines = code.split('\n');
        codeLines.forEach(line => {

            // Filtro de Mensagem 

            const match = line.match(/display\.drawPixel\((\d+), (\d+), SSD1306_WHITE\);/);
            if (match) {
                const x = parseInt(match[1]);
                const y = parseInt(match[2]);

                // Executando a Ação

                const index = y * 128 + x;
                if (index >= 0 && index < 128 * 64) {
                    cells[index].style.backgroundColor = '#3fd2e0';
                    blackPixels.push({ x, y });
                }
            }
        });
    }
});

// Botão de Apagar Malha

clearButton.addEventListener('click', function () {
    cells.forEach(cell => {
        cell.style.backgroundColor = '#000000';
    });
    blackPixels.length = 0;
});