const fs = require('fs');

function day4() {
    const data = fs.readFileSync('day4/input.txt', 'utf8').split("\n").filter(value => value !== "");

    const numbers = data[0].split(",").map(value => parseInt(value));

    const boards = [];

    for(let i = 1; i < data.length/5; i++) {
        boards[i-1] = [];
        for(let j = 0; j < 5; j++) {
            boards[i-1].push(data[i*5 + j - 4].split(" ").filter(value => value !== "").
                map(value => ({number: parseInt(value), marked: false})));
        }
    }

    var stop = false;
    var winners = [];

    for(let i = 0; i < numbers.length; i++) {
        for(let j = 0; j < boards.length; j++) {

            if(winners.some(val => val[0] == j)) {continue;}

            for(let k = 0; k < 5; k++) {
                if(boards[j].map(value => value[k]).filter(value => value.marked).length == 5
                || boards[j][k].filter(value => value.marked).length == 5 ) {
                        winners.push([j, numbers[i-1]]);
                        break;
                }
            }
            
            if(winners.some(val => val[0] == j)) {continue;}

            stop = false; 
            for(let k = 0; k < 5; k++) {
                for(let l = 0; l < 5; l++) {
                    if(boards[j][k][l].number == numbers[i]) {
                        boards[j][k][l].marked = true;
                        stop = true;
                        break;
                    }
                }
                if(stop) { break; }
            } 
        }
    }

    return {"part 1": winner_score(boards[winners[0][0]], winners[0][1]),
            "part 2": winner_score(boards[winners[winners.length-1][0]], winners[winners.length-1][1])};
}

function winner_score(winner_board, winning_number) {
    var winner_score = 0;
    for(let j = 0; j < 5; j++) {
        for(let k = 0; k < 5; k++) {
            if(!winner_board[j][k].marked) {
                winner_score += winner_board[j][k].number;
            }
        }
    }
    return winner_score * winning_number; 
}

module.exports = day4;
