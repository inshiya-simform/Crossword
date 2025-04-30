import { GRID_SIZE } from "./constant";
import { data } from "./data";
import { generateInitialGrid } from "./util";

type Position={
    id:number,
    row:number,
    col:number
}[]
export class Crossword {
    size:number;
    grid:string[][];
    positions:Position = [];
    constructor(){
        this.size = GRID_SIZE;
        this.grid = generateInitialGrid();
        this.positions = this.getStartPositions();
    }
    getIdByPosition(rowIndex:number,colIndex:number):string | null{
        const element= this.positions.find((element)=>element.row === rowIndex && element.col === colIndex)
        if(element){return element.id.toString()}
        else return null
    }
    generateCrossword(){
        data.forEach((element)=>{
            if(element.dir === "vertical"){
                this.placeWordVertically(element.word,element.row,element.col);
            }else{
                this.placeWordHorizontally(element.word,element.row,element.col);
            }
        })
        return this.grid;
    }
    private getStartPositions(){
        data.forEach((element)=>{
            this.positions.push({
                id: element.id,
                row: element.row,
                col: element.col
            })
        })
        return this.positions
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