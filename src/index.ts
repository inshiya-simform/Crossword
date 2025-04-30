import { Crossword } from "./crossword";
import { $ } from "./util";

const gridElement = document.getElementById("grid")!;

function renderGrid(){
    const crossword = new Crossword();
    const crosswordGrid = crossword.generateCrossword();
    crosswordGrid.forEach((row,rowIndex)=>{
        const rowElement = document.createElement('ul');
        row.forEach((cell,colIndex)=>{
            const inputElemet = document.createElement('input');
            const wordIdElement = document.createElement('p');
            wordIdElement.textContent = crossword.getIdByPosition(rowIndex,colIndex);
            $(wordIdElement).css('color','black').css('position','absolute').css('top','0%').css('left','0%').css('padding','0').css('margin','0');
            inputElemet.type = 'text'
            inputElemet.className = cell ? 'active' : 'inactive';
            if(inputElemet.className === 'inactive'){
                inputElemet.disabled =true
            }else{
                inputElemet.disabled = false;
            }
            inputElemet.maxLength = 1;
            const liElement = document.createElement('li');
            liElement.appendChild(wordIdElement);
            liElement.appendChild(inputElemet);
            rowElement.appendChild(liElement);
        })
        gridElement.appendChild(rowElement);
    })
}
    
renderGrid();