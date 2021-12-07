const fs = require('fs');

function day7() {
    const data = fs.readFileSync('day7/input.txt', 'utf8').split(",").map(value => parseInt(value));
    
    //part 1
    const best_position1 = data.sort((a,b) => a-b)[Math.round(data.length/2)];

    const fuel1 = data.reduce((a,b) => (a + Math.abs(b - best_position1)), 0);

    //////////////////
    //part 2
    const average_position = data.reduce((a,b) => a+b)/data.length;

    const best_position2 = Math.round(average_position - 1/2);

    var fuel2_a = 0;
    var fuel2_b = 0;

    for(let i = 0; i < data.length; i++) {
        let distance_a = Math.abs(data[i] - best_position2);
        let distance_b = Math.abs(data[i] - best_position2 + 1);
        fuel2_a += distance_a*(distance_a+1)/2;
        fuel2_b += distance_b*(distance_b+1)/2;
    }

    return {"part 1": fuel1,
            "part 2": Math.min(fuel2_a, fuel2_b)}
}

module.exports = day7;
