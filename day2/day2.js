const fs = require('fs');

function day2() {
    const data = fs.readFileSync('day2/input.txt', 'utf8').split("\n").map(function(item) { 
        return {direction: item.charAt(0), distance: item.slice(-1)};
    });

    const position = {horizontal: 0, aim: 0, depth: 0};
    var distance = 0;
    
    //part 1 & part 2
    for(let i = 0; i < data.length; i++) {

        distance = parseInt(data[i].distance);

        switch(data[i].direction) {
            case "f":
                position.horizontal += distance;
                position.depth += distance * position.aim;
                break;
            case "d":
                position.aim += distance;
                break;
            case "u":
                position.aim -= distance;
                break;
        }
    }

    return {"part 1": position.horizontal * position.aim,
            "part 2": position.horizontal * position.depth};
}

module.exports = day2;
