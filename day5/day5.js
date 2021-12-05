const fs = require('fs');

function day5() {
    const data = fs.readFileSync('day5/input.txt', 'utf8').split("\n").map(value => value.split(" -> ").map(value => value.split(",").map(value => parseInt(value))));

    //part 1 & 2

    const lines_1 = Array(1000).fill().map(() => Array(1000).fill(0));
    const lines_2 = Array(1000).fill().map(() => Array(1000).fill(0));

    for(let i = 0; i < data.length - 1; i++) {
        const points = data[i];

        const sign_x = points[1][0] > points[0][0] ? 1 : -1; 
        const sign_y = points[1][1] > points[0][1] ? 1 : -1;

        if(points[0][0] == points[1][0]) { // X is the same
            for(let j = 0; j <= sign_y * (points[1][1] - points[0][1]); j++) {
                lines_1[points[0][0]][points[0][1] + j * sign_y] += 1;
                lines_2[points[0][0]][points[0][1] + j * sign_y] += 1;
            }
        }
        else if(points[0][1] == points[1][1]) { // Y is the same
            for(let j = 0; j <= sign_x * (points[1][0] - points[0][0]); j++) {
                lines_1[points[0][0] + j * sign_x][points[0][1]] += 1;
                lines_2[points[0][0] + j * sign_x][points[0][1]] += 1;
            }
        }
        else if(sign_x*(points[0][0] - points[1][0]) == sign_y*(points[0][1] - points[1][1])) { // diagonal (for part 2)
            for(let j = 0; j <= sign_x * (points[1][0] - points[0][0]); j++) {
                lines_2[points[0][0] + j * sign_x][points[0][1] + j * sign_y] += 1;
            }
        }
    }

    return {"part 1": lines_1.flat().filter(val => val > 1).length,
            "part 2": lines_2.flat().filter(val => val > 1).length};
}

module.exports = day5;
