const fs = require('fs');

var data;

function day15() {
    data = fs.readFileSync('day15/input.txt', 'utf8').split("\n").slice(0,-1).map(value => value.split('').map(value => parseInt(value)));
    
    const part_1 = safestPathQ([data.length - 1, data[0].length - 1]);
    const size = [data.length, data[0].length];

    for(let i = 0; i < size[0] * 5; i++) {
        if(!data[i]) data[i] = [];
        for(let j = 0; j < size[1] * 5; j++) {
            data[i][j] = (data[i%size[0]][j%size[1]] + Math.floor(i/size[0]) + Math.floor(j/size[1] - 1)) % 9 + 1;
        }
    }

    const part_2 = safestPathQ([data.length - 1, data[0].length - 1]);
    return {"part 1": part_1,
            "part 2": part_2}
}

function safestPathQ(end_node) {
    const start = new Date();
    const risks = Array.from({length: data.length}, () => Array.from({length: data[0].length}, () => Infinity));
    risks[0][0] = 0;

    var queue = { v: [0,0,0] };
    
    while(true) {
        const [risk, x, y] = queue.v;

        if(x == end_node[0] && y == end_node[1]) {
            console.log(`Took ${(new Date() - start)/1000} seconds`);
            return risk;
        }

        const children = neighbors([x,y]);

        for(let i = 0; i < children.length; i++) {
            const new_risk = risk + data[children[i][0]][children[i][1]];
            if(!risks[children[i][0]][children[i][1]] || new_risk < risks[children[i][0]][children[i][1]]) {
                
                risks[children[i][0]][children[i][1]] = new_risk;
                var p = queue;

                while(p.n != null && p.n.v[0] < new_risk) {
                    p = p.n;
                }

                p.n = { v: [new_risk, children[i][0], children[i][1]], n: p.n};
            }
        }
        queue = queue.n;
    }
}

function neighbors(node) {
    const result = [];

    const i = node[0];
    const j = node[1];

    if(data[i-1] && data[i-1][j]) {
        result.push([i-1, j]);
    }
    if(data[i+1] && data[i+1][j]) {
        result.push([i+1, j]);
    }
    if(data[i][j-1]) {
        result.push([i,j-1]);
    }
    if(data[i][j+1]) {
        result.push([i,j+1]);
    }
    return result;
}

module.exports = day15;
