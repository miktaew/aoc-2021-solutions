const fs = require('fs');

const caverns = {};
const paths = [];
const paths2 = [];

function day12() {
    const data = fs.readFileSync('day12/input.txt', 'utf8').split("\n").map(value => value.split('-')).slice(0,-1);

    for(let i = 0; i < data.length; i++) {
        if(!caverns[data[i][0]]) {
            caverns[data[i][0]] = new cavern();
        }
        if(!caverns[data[i][1]]) {
            caverns[data[i][1]] = new cavern();
        }

        if(!caverns[data[i][0]].neighbors.includes(data[i][1])) {
            caverns[data[i][0]].neighbors.push(data[i][1]);
        }
        if(!caverns[data[i][1]].neighbors.includes(data[i][0])) {
            caverns[data[i][1]].neighbors.push(data[i][0]);
        }
    }

    //part 1
    travel("start", [], 1);
    //part 2
    travel("start", [], 2);

    return {"part 1": paths.length,
            "part 2": paths2.length}
}

class cavern {
    constructor() {
        this.neighbors = [];
    }
}

function travel(next_cavern, path, num) {
    if(path.length > 1 && next_cavern === "start") {
        return;
    }

    var next_name = next_cavern;
    if(next_cavern.toLowerCase() === next_cavern && path.includes(next_cavern)) {
        if(num == 1 || num == 2 && path.filter(value => value[0] == "2").length != 0) {
            return;
        } 
        else {
            next_name = "2" + next_cavern; //this is so stupid
        }
    }

    path.push(next_name);

    if(next_cavern === "end") {
        num == 1 ? paths.push(path) : paths2.push(path);
        return;
    }

    for(let i = 0; i < caverns[next_cavern].neighbors.length; i++) {
        travel(caverns[next_cavern].neighbors[i], path.slice(), num);
    }
}

module.exports = day12;
