const fs = require('fs');

function day4() {
    const data = fs.readFileSync('day4/input.txt', 'utf8').split("\n").filter(function(value) {
        return value !== "";
    });

    const numbers = data[0].split(",").map(function(value) {
        return parseInt(value);
    });

    const boards = [];

    for(let i = 1; i < data.length/5; i++) {
        boards[i-1] = [];
        for(let j = 0; j < 5; j++) {
            boards[i-1].push(data[i*5 + j - 4].split(" ").filter(function(value){ 
                return value !== "";
            }).map(function(value) {
                return {number: parseInt(value), marked: false};
            }));
        }
    }

    var stop = false;
    var winners = [];
    var first_winner = null;
    var first_winning_number = null;
    var last_winner = null;
    var last_winning_number = null;


    for(let i = 0; i < numbers.length; i++) {
        for(let j = 0; j < boards.length; j++) {
            if(winners.includes(j)) {continue;}
            for(let k = 0; k < 5; k++) {
                if(boards[j][k].filter(function(value){
                    return value.marked;
                }).length == 5){
                    if(!first_winner) {first_winner = j; first_winning_number = numbers[i-1];}
                    winners.push(j);
                    last_winner = j;
                    last_winning_number = numbers[i-1];
                    break;
                }
            }
            
            for(let k = 0; k < 5; k++) {
                if(boards[j].map(function(value){ 
                        return value[k]; 
                    }).filter(function(value){
                        return value.marked;
                    }).length == 5) {
                        if(!first_winner) {first_winner = j; first_winning_number = numbers[i-1];}
                        winners.push(j);
                        last_winner = j;
                        last_winning_number = numbers[i-1]
                        break;
                }  
            }

            if(j == first_winner || winners.includes(j)) {continue; }

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

    var first_winner_score = winner_score(boards[first_winner], first_winning_number);
    var last_winner_score = winner_score(boards[last_winner], last_winning_number);

    return {"part 1": first_winner_score,
            "part 2": last_winner_score};
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
