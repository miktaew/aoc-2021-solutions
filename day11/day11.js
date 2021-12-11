const fs = require('fs');

const octopi = [];
var current_step = 1;
var flash_count = 0;
var synchronized_flash = -1;

function day11() {
    const data = fs.readFileSync('day11/input.txt', 'utf8').split("\n").map(value => value.split('').map(value => parseInt(value))).slice(0,-1);

    for(let i = 0; i < data.length; i++) {
        octopi[i] = [];
        for(let j = 0; j < data[0].length; j++) {
            octopi[i][j] = new octopus(i, j, data[i][j]);
        }
    }

    //part 1 and 2
    for(; current_step < 1000; current_step++) {
        for(let i = 0; i < octopi.length; i++) {
            for(let j = 0; j < octopi[i].length; j++) {
                if(octopi[i][j].last_flash < current_step) {
                    octopi[i][j].energy++;
                    octopi[i][j].flash();
                }
            }
        }

        //searching for first synchronized flash
        var should_break = synchronized_flash != -1? true : false;

        if(should_break) { 
            continue; 
        }

        synchronized_flash = current_step;

        for(let i = 0; i < octopi.length; i++) {
            for(let j = 0; j < octopi[i].length; j++) {
                if(octopi[i][j].energy != 0) {
                    synchronized_flash = -1;
                    should_break = true;
                    break;
                }
            }

            if(should_break) {
                break
            };
        }

    }
    
    return {"part 1": flash_count,
            "part 2": synchronized_flash}
}

class octopus {
    constructor(x, y, energy) {
        this.x = x;
        this.y = y;
        this.energy = energy;
        this.last_flash = -1;
    }

    flash() {
        if(this.last_flash == current_step) {
            this.energy = 0;
            return;
        }
        if(this.energy < 10) { 
            return; 
        }

        this.energy = 0;
        this.last_flash = current_step;

        if(current_step < 101) {
            flash_count++;
        }

        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {

                if(i == 1 && i == j) {
                    continue;
                }

                if(typeof octopi[this.x - 1 + i] !== "undefined" && typeof octopi[this.x - 1 + i][this.y - 1 + j] !== "undefined") {
                    octopi[this.x - 1 + i][this.y - 1 + j].energy++;
                    octopi[this.x - 1 + i][this.y - 1 + j].flash();
                }
            }
        }
    }
}

module.exports = day11;
