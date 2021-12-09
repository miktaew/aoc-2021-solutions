const fs = require('fs');

function day8() {
    const data = fs.readFileSync('day8/input.txt', 'utf8').split("\n").map(value => value.split(" | "));
    data.pop(-1);

    const input_segments = data.map(value => value[0].split(" "));
    const output_segments = data.map(value => value[1].split(" "));
    
    //part 1
    var part_1 = 0;

    for(let i = 0; i < output_segments.length; i++) {
        for(let j = 0; j < 4; j++) {
            if([2,3,4,7].includes(output_segments[i][j].length)) {
                part_1++;
            }
        }
    }

    //part 2
    var part_2 = 0;
    var magic_pattern = {'467889': 0, 
                         '89': 1, 
                         '47788': 2, 
                         '77889': 3, 
                         '6789': 4, 
                         '67789': 5, 
                         '467789': 6, 
                         '889': 7, 
                         '4677889': 8, 
                         '677889': 9};

    const sort_nums = function(text) { return text.split('').sort().join(''); }

    for(let i = 0; i < data.length; i++) {
        const counts = {'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0};
        var value = "";

        Object.keys(counts).forEach(key => counts[key] = input_segments[i].reduce((a,b)=>a+b).split(key).length - 1);
        
        for(let j = 0; j < output_segments[i].length; j++) {
            Object.keys(counts).forEach(key => output_segments[i][j] = output_segments[i][j].replaceAll(key, counts[key]));

            output_segments[i][j] = sort_nums(output_segments[i][j]);
            value += magic_pattern[output_segments[i][j]];
        }
        part_2 += parseInt(value);
    }

    return {"part 1": part_1,
            "part 2": part_2}
}

module.exports = day8;
