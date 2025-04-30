import { Crossword } from "./crossword";
import { $ } from "./util";

const gridElement = document.getElementById("grid")!;

const crossword = new Crossword();
function renderGrid(){
    const crosswordGrid = crossword.generateCrossword();
    crosswordGrid.forEach((row,rowIndex)=>{
        const rowElement = document.createElement('ul');
        rowElement.id = 'crossword-ul'
        row.forEach((cell,colIndex)=>{
            const inputElement = document.createElement('input');
            const wordIdElement = document.createElement('p');
            wordIdElement.textContent = crossword.getIdByPosition(rowIndex,colIndex);
            $(wordIdElement).css('color','black').css('position','absolute').css('top','0%').css('left','0%').css('padding','0').css('margin','0');
            inputElement.type = 'text'
            inputElement.className = cell ? 'active' : 'inactive';
            if(inputElement.className === 'inactive'){
                inputElement.disabled =true
            }else{
                inputElement.disabled = false;
            }
            inputElement.maxLength = 1;
            const liElement = document.createElement('li');
            liElement.appendChild(wordIdElement);
            liElement.appendChild(inputElement);
            rowElement.appendChild(liElement);
        })
        gridElement.appendChild(rowElement);
    })
}

function renderClues(){
    const clues = crossword.getClues();
    const clueListElement = document.getElementById('clues');

    clues.forEach((clue)=>{
        const liElement = document.createElement('li');
        liElement.textContent = clue.id + ". " +clue.clue;
        $(liElement).css('color','white');
        clueListElement?.appendChild(liElement)
    })
}
renderGrid();
renderClues();