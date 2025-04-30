import { GRID_SIZE } from "./constant";

export function generateInitialGrid(){
    const grid = []

    for(let i=0;i<GRID_SIZE;i++){
        const row = []
        for(let j=0;j<GRID_SIZE;j++){
            row.push("")
        }
        grid.push(row)
    }
    return grid
}

export function $(element:HTMLElement){   
    return {
        element: element,
        css: function (property:string, value:string){
            element.style.setProperty(property,value)
            return this
        }
    }
}