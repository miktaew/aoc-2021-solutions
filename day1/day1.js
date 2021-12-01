const fs = require('fs');

function day1() {
    const data = fs.readFileSync('day1/input.txt', 'utf8').split("\n").map(function(item) {
        return parseInt(item);
    });

    //part 1
    let counter = 0;
    for(let i = 1; i < data.length; i++) {
        if(data[i] > data[i-1]) {
            counter += 1;
        }
    }

    ////////////////////////////////////////
    //part 2
    let counter_2 = 0;
    for(let i = 3; i < data.length; i++)
    {
        if(data[i] - data[i-3] > 0) {
            counter_2 += 1;
        }
    }

    return {"part 1": counter,
            "part 2": counter_2};
}

module.exports = day1;