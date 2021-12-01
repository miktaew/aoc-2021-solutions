const fs = require('fs');

function day1() {
    const data = fs.readFileSync('day1/input.txt', 'utf8').split("\n").map(function(item) { return parseInt(item); });

    const answers = {"part 1": 0,
                     "part 2": 0};

    //part 1
    for(let i = 1; i < data.length; i++) {
        if(data[i] > data[i-1]) {
            answers["part 1"] += 1;
        }
    }

    ////////////////////////////////////////
    //part 2
    for(let i = 3; i < data.length; i++)
    {
        if(data[i] - data[i-3] > 0) {
            answers["part 2"] += 1;
        }
    }

    return answers;
}

module.exports = day1;
