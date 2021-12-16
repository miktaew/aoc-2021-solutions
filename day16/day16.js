const fs = require('fs');

var versions_sum = 0;

function day16() {
    const data = fs.readFileSync('day16/input.txt', 'utf8').trim();
    const hex_to_bin = {
                "0": "0000", "1": "0001", "2": "0010", "3": "0011", 
                "4": "0100", "5": "0101", "6": "0110", "7": "0111", 
                "8": "1000", "9": "1001", "A": "1010", "B": "1011",
                "C": "1100", "D": "1101", "E": "1110", "F": "1111"}

    var decoded = "";
    for(let i = 0; i < data.length; i++) {
        decoded += hex_to_bin[data[i]];
    }

    [, part_2] = process(decoded);
    
    return {"part 1": versions_sum,
            "part 2": part_2}
}

function process(packet) {
    versions_sum += parseInt(packet.slice(0,3), 2);
    const packet_type = parseInt(packet.slice(3,6), 2);
    var values = [];
    
    if(packet_type == 4) {
        var str_value = "";
        var i = 6;

        while(packet[i] !== "0") {
            str_value += packet.slice(i + 1, i + 5);
            i += 5;
        }

        str_value += packet.slice(i + 1, i + 5);
        return [i + 5, parseInt(str_value, 2)];
    }
    else {
        var packet_length;
        var length_type = parseInt(packet[6]);
        
        if(length_type == 0) {
            var length = parseInt(packet.slice(7,22),2);
            let curr_size = 0;
            while(curr_size < length) {
                var p_sub_packet = process(packet.slice(curr_size + 22));
                curr_size += p_sub_packet[0];
                values.push(p_sub_packet[1])
            }
            packet_length = length + 22;
        }
        else {
            var length = parseInt(packet.slice(7,18),2);
            var curr_size = 18;
            for(let i = 0; i < length; i++) {
                var p_sub_packet = process(packet.slice(curr_size));
                curr_size += p_sub_packet[0];
                values.push(p_sub_packet[1]);
            }
            packet_length = curr_size;
        }

        switch (packet_type) {
            case 0: 
                return [packet_length, values.reduce((a,b) => a + b)];
            case 1: 
                return [packet_length, values.reduce((a,b) => a * b)];
            case 2: 
                return [packet_length, values.reduce((a,b) => Math.min(a,b))];
            case 3: 
                return [packet_length, values.reduce((a,b) => Math.max(a,b))];
            case 5: 
                return [packet_length, (values[0] > values[1]) ? 1 : 0];
            case 6: 
                return [packet_length, (values[1] > values[0]) ? 1 : 0];
            case 7: 
                return [packet_length, (values[0] == values[1]) ? 1 : 0];
          }
    }    
}

module.exports = day16;
