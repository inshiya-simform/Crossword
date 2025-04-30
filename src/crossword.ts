import { GRID_SIZE, HORIZONTAL, VERTICAL } from "./constant";
import { data } from "./data";
import { generateInitialGrid } from "./util";

type Position={
    id:number,
    row:number,
    col:number
}[]
type Clue={
    id:number,
    clue:string,
}[]

export class Crossword {
    size:number;
    grid:string[][];
    positions:Position = [];
    clues:Clue =[];
    constructor(){
        this.size = GRID_SIZE;
        this.grid = generateInitialGrid();
        this.populatePositionAndClues();
    }
    checkLetterAt(rowIndex:number,colIndex:number){
        return this.grid[rowIndex][colIndex]
    }
    getNextPosition(id:number,rowIndex:number,colIndex:number){
        const element = data.find((element)=>element.id === id)
        if(element){
            if(element.dir === 'vertical'){
                const nextRow = rowIndex + 1;
                if(nextRow > GRID_SIZE){
                    throw new Error('Out of bound')
                }
                return {
                    row: nextRow,
                    col: colIndex
                }
            }else{
                const nextCol = colIndex + 1;
                if(nextCol > GRID_SIZE){
                    throw new Error('Out of bound')
                }
                return {
                    row: rowIndex,
                    col: nextCol
                }
            }
        }
    }
    startAt(rowIndex:number,colIndex:number):string | null{
        const element= this.positions.find((element)=>element.row === rowIndex  && element.col === colIndex)
        if(element){return element.id.toString()}
        else return null
    }
    getPositionById(rowIndex:number,colIndex:number){
        const element= data.find((element)=>{
            if(element.dir === VERTICAL){
                if(colIndex >= element.col && colIndex < element.word.length){
                    return true
                }else{
                    return false
                }
            }
            else if (element.dir === HORIZONTAL){
                if(rowIndex >= element.row && rowIndex < element.word.length){
                    return true
                }else{
                    return false
                }
            }
        })
        if(element){return element.id.toString()}
        else return null
    }
    generateCrossword(){
        data.forEach((element)=>{
            if(element.dir === VERTICAL){
                this.placeWordVertically(element.word,element.row,element.col);
            }else{
                this.placeWordHorizontally(element.word,element.row,element.col);
            }
        })
        return this.grid;
    }
    getClues(){
        return this.clues;
    }
    private populatePositionAndClues(){
        data.forEach((element)=>{
            this.positions.push({
                id: element.id,
                row: element.row,
                col: element.col
            })
            this.clues.push({
                id:element.id,
                clue:element.clue
            })
        })
    }
    private placeWordVertically(word:string, row:number, col:number){
        if(row + word.length > this.size){
            throw new Error("Word does not fit vertically")
        }else{
            for(let i=0;i<word.length;i++){
                this.grid[row+i][col] = word[i]
            }
        }
    }
    private placeWordHorizontally(word:string, row:number, col:number){
        if(col + word.length > this.size){
            throw new Error("Word does not fit horizontally")
        }else{
            for(let i=0;i<word.length;i++){
                this.grid[row][col+i] = word[i]
            }
        }
    }
}