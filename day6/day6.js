const fs = require('fs');

function day6() {
    const data = fs.readFileSync('day6/input.txt', 'utf8').split(",").map(value => parseInt(value));

    const fish = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0};
    var fish80 = 0;

    for(let i = 0; i < data.length; i++) {
        fish[data[i]] += 1;
    }

    for(let i = 0; i < 256; i++) {
        const temp_fish = Object.assign({}, fish);
        if(i == 80) {
            fish80 = Object.values(fish).reduce((a,b) => a + b);
        }

        for(let j = 0; j<9; j++) {
            if(j==6) {
                fish[6] = temp_fish[0] + temp_fish[7];
            }
            else if(j==8) {
                fish[8] = temp_fish[0];
            }
            else {
                fish[j] = temp_fish[j+1];
            }
        }
    }

    return {"part 1": fish80,
            "part 2": Object.values(fish).reduce((a,b) => a + b)}
}

module.exports = day6;
