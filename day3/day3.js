const fs = require('fs');

function day3() {
    const data = fs.readFileSync('day3/input.txt', 'utf8').split("\n");

    const bin_size = data[0].length;
    const bits = new Array(bin_size).fill(0);

    var bit = 0;
    
    var gamma_str = "";
    var epsilon_str = "";
    
    //part 1

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < bin_size; j++) {
            bits[j] += data[i][j] === "1"? 1 : - 1;
        }
    }

    for(let i = 0; i < bin_size; i++) {
        gamma_str += bits[i] > 0? "1" : "0";
        epsilon_str += bits[i] > 0? "0" : "1";
    }

    const power_consumption = parseInt(gamma_str, 2) * parseInt(epsilon_str, 2);
    ///////////////////////
    //part 2

    var oxygen_data = data.slice();
    var scrubber_data = data.slice();

    for(let i = 0; i < bin_size; i++) {

        bit = 0;
        for(let j = 0; j < oxygen_data.length; j++) {
            bit += oxygen_data[j][i] === "1"? 1 : -1;
        }
        oxygen_data = oxygen_data.filter(function(value){
            return bit >= 0? value[i] === "1" : value[i] === "0";
        });

        if(oxygen_data.length == 1) {
            break;
        }
    }

    for(let i = 0; i < bin_size; i++) {

        bit = 0;
        for(let j = 0; j < scrubber_data.length; j++) {
            bit += scrubber_data[j][i] === "1"? 1 : -1;
        }
        scrubber_data = scrubber_data.filter(function(value){
            return bit >= 0? value[i] === "0" : value[i] === "1";
        });

        if(scrubber_data.length == 1) {
            break;
        }
    }

    const life_support_rating = parseInt(scrubber_data[0], 2)*parseInt(oxygen_data[0], 2);


    return {"part 1": power_consumption,
            "part 2": life_support_rating};
}

module.exports = day3;
