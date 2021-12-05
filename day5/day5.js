const fs = require('fs');

function day5() {
    const data = fs.readFileSync('day5/input.txt', 'utf8').split("\n").map(value => value.split(" -> ").map(value => value.split(",").map(value => parseInt(value))));

    //part 1 & 2

    const lines_1 = Array(1000).fill().map(() => Array(1000).fill(0));
    const lines_2 = Array(1000).fill().map(() => Array(1000).fill(0));

    for(let i = 0; i < data.length - 1; i++) {
        const first_x = Math.min(data[i][0][0], data[i][1][0]);
        const second_x = Math.max(data[i][0][0], data[i][1][0]);
        const first_y = Math.min(data[i][0][1], data[i][1][1]);
        const second_y = Math.max(data[i][0][1], data[i][1][1]);
        const sign_x = data[i][1][0] > data[i][0][0] ? 1 : -1; 
        const sign_y = data[i][1][1] > data[i][0][1] ? 1 : -1;

        if(first_x == second_x) { // X is the same
            for(let j = first_y; j <= second_y; j++) {
                lines_1[first_x][j] += 1;
                lines_2[first_x][j] += 1;
            }
        }
        else if(first_y == second_y) { // Y is the same
            for(let j = first_x; j <= second_x; j++) {
                lines_1[j][first_y] += 1;
                lines_2[j][first_y] += 1;
            }
        }

        else if(first_x - second_x == first_y - second_y) { // diagonal (for part 2)
            for(let j = 0; j <= second_x - first_x; j++) {
                lines_2[data[i][0][0] + j * sign_x][data[i][0][1] + j * sign_y] += 1;
            }
        }
    }

    return {"part 1": lines_1.flat().filter(val => val > 1).length,
            "part 2": lines_2.flat().filter(val => val > 1).length};
}

module.exports = day5;
