const fs = require('fs');

const depths = [];

function day9() {
    const data = fs.readFileSync('day9/input.txt', 'utf8').split("\n").map(value => value.split('').map(value => parseInt(value))).slice(0,-1);

    //part 1
    var risk_levels_low = 0;    

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[0].length; j++) {
            if((typeof data[i-1]    === "undefined" || data[i-1][j] > data[i][j]) &&
               (typeof data[i+1]    === "undefined" || data[i+1][j] > data[i][j]) &&
               (typeof data[i][j+1] === "undefined" || data[i][j+1] > data[i][j]) &&
               (typeof data[i][j-1] === "undefined" || data[i][j-1] > data[i][j])) {
                    risk_levels_low += 1 + data[i][j];
            }
        }
    }
    //part 2

    const start = new Date();
    for(let i = 0; i < data.length; i++) {
        depths[i] = [];
        for(let j = 0; j < data[0].length; j++) {
            depths[i][j] = new point(i, j, data[i][j]);
        }
    }

    for(let i = 0; i < depths.length; i++) {
        for(let j = 0; j < depths[0].length; j++) {
            if(typeof depths[i][j].basin !== "undefined" || depths[i][j].height == 9) {
                continue;
            }
            else {
                const curr_basin = new basin();
                basins.push(curr_basin);
                curr_basin.expand(depths[i][j]);
            }
        }
    }
    
    return {"part 1": risk_levels_low,
            "part 2": basins.map(value => value.size).sort((a,b)=>(b-a)).slice(0,3).reduce((a,b)=>(a*b),1)}
}

var basin_counter = 0;
const basins = [];

class point {
    constructor(x, y, h) {
        this.x = x;
        this.y = y;
        this.height = h;
    }
}

class basin {
    constructor(points) {
        this.points = [];
        this.size = 0;
        this.id = basin_counter;
        basin_counter++;
    }

    expand(start_point) {
        if(start_point.height == 9 || typeof start_point.basin !== "undefined") { 
            return; 
        }

        start_point.basin = this.id;
        this.points.push(start_point);
        this.size++;

        if(typeof depths[start_point.x-1] !== "undefined" && typeof depths[start_point.x-1][start_point.y] !== "undefined") {
            this.expand(depths[start_point.x-1][start_point.y]);
        }
        if(typeof depths[start_point.x+1] !== "undefined" && typeof depths[start_point.x+1][start_point.y] !== "undefined") {
            this.expand(depths[start_point.x+1][start_point.y]);
        }
        if(typeof depths[start_point.x][start_point.y+1] !== "undefined") {
            this.expand(depths[start_point.x][start_point.y+1]);
        }
        if(typeof depths[start_point.x][start_point.y-1] !== "undefined") {
            this.expand(depths[start_point.x][start_point.y-1]);
        }
    }
}

module.exports = day9;
