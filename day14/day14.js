const fs = require('fs');

function day14() {
    const data = fs.readFileSync('day14/input.txt', 'utf8').split("\n").slice(0,-1);

    const polymer_template = data[0];
    var pair_insertions = [];
    var elements10 = {};
    var elements = {};
    var pairs = {};

    for(let i = 2; i < data.length; i++) {
        pair_insertions.push(data[i].split(" -> "));
    }

    for(let i = 0; i < polymer_template.length - 1; i++) {
        pairs[polymer_template.slice(i, i + 2)] = pairs[polymer_template.slice(i, i + 2)] ? pairs[polymer_template.slice(i, i + 2)] + 1 : 1;
    }

    for(let i = 0; i < polymer_template.length; i++) {
        elements[polymer_template[i]] = elements[polymer_template[i]] ? elements[polymer_template[i]] + 1 : 1;
    }
    
    //parts 1 && 2
    for(let i = 0; i < 40; i++) {
        if(i == 10) {
            elements10 = Object.assign({}, elements);
        }

        var temp_pairs = Object.assign({}, pairs);

        for(let j = 0; j < pair_insertions.length; j++) {
            if(!pairs[pair_insertions[j][0]]) {
                continue;
            }

            temp_pairs[pair_insertions[j][0]] -= pairs[pair_insertions[j][0]];

            if(!temp_pairs[`${pair_insertions[j][0][0]}${pair_insertions[j][1]}`]) {
                temp_pairs[`${pair_insertions[j][0][0]}${pair_insertions[j][1]}`] = pairs[pair_insertions[j][0]];
            }
            else {
                temp_pairs[`${pair_insertions[j][0][0]}${pair_insertions[j][1]}`] += pairs[pair_insertions[j][0]];
            }

            if(!temp_pairs[`${pair_insertions[j][1]}${pair_insertions[j][0][1]}`]) {
                temp_pairs[`${pair_insertions[j][1]}${pair_insertions[j][0][1]}`] = pairs[pair_insertions[j][0]];
            }
            else {
                temp_pairs[`${pair_insertions[j][1]}${pair_insertions[j][0][1]}`] += pairs[pair_insertions[j][0]];
            }

            elements[pair_insertions[j][1]] = elements[pair_insertions[j][1]] ? elements[pair_insertions[j][1]] + pairs[pair_insertions[j][0]] 
                                                                              : pairs[pair_insertions[j][0]];
        }
        pairs = Object.assign({}, temp_pairs);
    }

    element_count_list = Object.entries(elements10).sort((a,b) => b[1] - a[1]);
    const part_1 = element_count_list[0][1] - element_count_list[element_count_list.length-1][1];

    element_count_list = Object.entries(elements).sort((a,b) => b[1] - a[1]);
    const part_2 = element_count_list[0][1] - element_count_list[element_count_list.length-1][1];

    return {"part 1": part_1,
            "part 2": part_2}
}

module.exports = day14;
