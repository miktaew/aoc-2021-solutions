const fs = require('fs');

var sheet;
function day13() {
    const data = fs.readFileSync('day13/input.txt', 'utf8').split("\n").slice(0,-1);

    const points = [];
    const folds = [];
    var z = 0;

    for(; z < data.length; z++) {
        if(data[z] === "") break; 
        points.push(data[z].split(",").map(value => parseInt(value)));
    }
    z++;
    for(; z < data.length; z++) {
        folds.push(data[z].replace("fold along ", ""));
    }

    const height = parseInt(folds.filter(value => value[0] === "y")[0].split("=")[1])*2 + 1;
    const width = parseInt(folds.filter(value => value[0] === "x")[0].split("=")[1])*2 + 1;
    
    sheet = Array.from({ length: height}, () => Array.from({ length: width}, () => "."));
    for(let i = 0; i < points.length; i++) {
        sheet[points[i][1]][points[i][0]] = "#";
    }

    //part 1
    fold(folds[0].split("=")[0],parseInt(folds[0].split("=")[1]));
    const part_1 = sheet.map(line => line.filter(value => value === "#")).reduce((a,b) => a + b.length, 0);

    //part 2
    for(let i = 1; i < folds.length; i++) {
        fold(folds[i].split("=")[0], parseInt(folds[i].split("=")[1]));
    }
    
    for(let i = 0; i < 8; i++) {
        console.log(sheet.map(value => value.slice(i*sheet[0].length/8, (i+1)*sheet[0].length/8)));
    }

    return {"part 1": part_1,
            "part 2": "letters can be deciphered from console"}
}

function fold(axis, index) {
    if(axis === "x") { //folding by x
        for(let j = 0; j < sheet.length; j++) {
            for(let i = 0; i < index; i++) {
                if(sheet[j][sheet[0].length - 1 - i] === "#") {
                    sheet[j][i] = "#";
                }
            }
        }
        for(let j = 0; j < sheet.length; j++) {
            sheet[j] = sheet[j].slice(0, index);
        }
    }
    else { //folding by y
        for(let j = 0; j < index; j++) {
            for(let i = 0; i < sheet[0].length; i++) {
                if(sheet[sheet.length - 1 - j][i] === "#") {
                    sheet[j][i] = "#";
                }
            }
        }
        sheet = sheet.slice(0, index);
    }
}

module.exports = day13;
