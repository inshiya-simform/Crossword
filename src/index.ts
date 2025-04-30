import { ARROWCONTROLS } from "./constant";
import { Crossword } from "./crossword";
import { $, move } from "./util";

type Progress = {
  id: number;
  word: string;
}[];

const gridElement = document.getElementById("grid")!;
const crossword = new Crossword();

const progress:Progress =[];

function handlechange(e: Event, rowIndex: number, colIndex: number) {
  if (e.target instanceof HTMLInputElement) {
    if (e.target.value === crossword.checkLetterAt(rowIndex, colIndex)) {
      $(e.target).css("background-color", "rgba(99, 242, 137,0.5)");
    }
    const id = crossword.getNearestIdByPosition(rowIndex, colIndex);
    const progressObject = progress.find((current) => current.id === Number(id));
    if(progressObject){
        progressObject.word += e.target.value
    }else{
        progress.push({
            id: Number(id),
            word: e.target.value
        })
    }
    localStorage.setItem('progress',JSON.stringify(progress))
    const nextPos = crossword.getNextPosition(Number(id), rowIndex, colIndex)!;
    const nextElement = document.getElementById(`${nextPos.row}${nextPos.col}`);
    if (nextElement) {
      nextElement.focus();
    }
  }
}

function handleKeyControl(
  e: KeyboardEvent,
  rowIndex: number,
  colIndex: number,
) {
  switch (e.key) {
    case ARROWCONTROLS.ArrowUp:
      move(-1, 0, rowIndex, colIndex);
      break;
    case ARROWCONTROLS.ArrowDown:
      move(1, 0, rowIndex, colIndex);
      break;
    case ARROWCONTROLS.ArrowLeft:
      move(0, -1, rowIndex, colIndex);
      break;
    case ARROWCONTROLS.ArrowRight:
      move(0, 1, rowIndex, colIndex);
      break;
  }
}

function getWordById(id:number){
    const storedProgress = JSON.parse(localStorage.getItem('progress')!)
    const progressInfo = storedProgress.find((progress:Progress[number])=>progress.id === id)
    if(progressInfo){
        return progressInfo.word
    }
}
function renderGrid() {
  const crosswordGrid = crossword.generateCrossword();
  crosswordGrid.forEach((row, rowIndex) => {
    const rowElement = document.createElement("ul");
    rowElement.id = "crossword-ul";
    row.forEach((cell, colIndex) => {
      const inputElement = document.createElement("input");
      inputElement.id = `${rowIndex}${colIndex}`;
      const id = crossword.getNearestIdByPosition(rowIndex,colIndex)!;
        if(id){
            const word = getWordById(id);
            if(word){
                inputElement.value = word.split('')[0]
            }
        }
      inputElement.addEventListener("input", (e: Event) =>
        handlechange(e, rowIndex, colIndex),
      );
      inputElement.addEventListener("keydown", (e) =>
        handleKeyControl(e, rowIndex, colIndex),
      );
      const wordIdElement = document.createElement("p");
      wordIdElement.textContent = crossword.startAt(rowIndex, colIndex);
      $(wordIdElement)
        .css("color", "black")
        .css("position", "absolute")
        .css("top", "0%")
        .css("left", "0%")
        .css("padding", "0")
        .css("margin", "0");
      inputElement.type = "text";
      inputElement.className = cell ? "active" : "inactive";
      if (inputElement.className === "inactive") {
        inputElement.disabled = true;
      } else {
        inputElement.disabled = false;
      }
      inputElement.maxLength = 1;
      const liElement = document.createElement("li");
      liElement.id = `li-${rowIndex}${colIndex}`;
      liElement.appendChild(wordIdElement);
      liElement.appendChild(inputElement);
      rowElement.appendChild(liElement);
    });
    gridElement.appendChild(rowElement);
  });
}

function renderClues() {
  const clues = crossword.getClues();
  const clueListElement = document.getElementById("clues");

  clues.forEach((clue) => {
    const liElement = document.createElement("li");
    liElement.textContent = clue.id + ". " + clue.clue;
    $(liElement).css("color", "white");
    clueListElement?.appendChild(liElement);
  });
}
renderGrid();
renderClues();
