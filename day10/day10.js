const fs = require('fs');

function day10() {
    const data = fs.readFileSync('day10/input.txt', 'utf8').split("\n").slice(0,-1);

    const valid_chars = "([{<";
    const openers = [];

    const opposite = {"(": ")", 
                      "[": "]", 
                      "{": "}", 
                      "<": ">"};

    const corruption_values = {")": 3,
                               "]": 57,
                               "}": 1197,
                               ">": 25137};
                           
    const ender_values = {")": 1,
                          "]": 2,
                          "}": 3,
                          ">": 4};

    //part 1
    var part_1 = 0;
    for(let i = 0; i < data.length; i++) {
        openers.push([]);
        for(let j = 0; j < data[i].length; j++) {
            if(data[i][j] == opposite[openers[i][openers[i].length - 1]])
            {
                openers[i].pop();
            }
            else if(valid_chars.includes(data[i][j])) {
                openers[i].push(data[i][j]);
            }
            else {
                part_1 += corruption_values[data[i][j]];
                openers[i] = [];
                break;
            }
        }
    }

    /////////////////
    //part 2
    var part_2_scores = [];

    for(let i = 0; i < openers.length; i++) {
        var total_score = 0;
        if(openers[i].length == 0) continue;

        for(let j = openers[i].length - 1; j >= 0; j--) {
            total_score = total_score * 5 + ender_values[opposite[openers[i][j]]];
        }
        part_2_scores.push(total_score);
    }

    return {"part 1": part_1,
            "part 2": part_2_scores.sort((a,b) => a-b)[Math.round((part_2_scores.length-1)/2)]}
}

module.exports = day10;
