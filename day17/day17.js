const fs = require('fs');

function day17() {
    const data = fs.readFileSync('day17/input.txt', 'utf8').trim().slice(15).split(", y=").map(value => value.split("..").map(value => parseInt(value)));

    //part 1 (math is love, and let's hope there no inputs where this won't work)
    var part_1 = data[1][0]*(data[1][0]+1)/2;

    //part 2
    var correct_velocities = [];
    var min_x = Math.ceil((Math.sqrt(8*data[0][0] + 1) - 1)/2); //minimum possible x velocity that will reach target area

    for(let x = min_x; x <= data[0][1]; x++) {
        for(let y = data[1][0]; y <= Math.abs(data[1][0]); y++ ) {
            const pos = [0, 0];
            const velocity = [x,y];
            while(pos[0] <= data[0][1] && pos[1] >= data[1][0]) {
                pos[0] += velocity[0];
                pos[1] += velocity[1];

                if(pos[0] >= data[0][0] && pos[0] <= data[0][1] && pos[1] <= data[1][1] && pos[1] >= data[1][0]) {
                    correct_velocities.push([x,y]);
                    break;
                }

                velocity[1] -= 1;
                if(velocity[0] > 0) {
                    velocity[0] -= 1;
                }
            }
        }
    }

    return {"part 1": part_1,
            "part 2": correct_velocities.length}
}


module.exports = day17;
