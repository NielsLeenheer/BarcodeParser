

class UPCA {

    static compress(value) {
        
        if (typeof value !== "string" || value.length !== 12 || !/^\d{12}$/.test(value)) {
            return value;
        }

        if (value.slice(4, 8) == "0000" && value[3] >= "0" && value[3] <= "2") {
            return value.slice(0, 3) + value.slice(8, 11) + value[3] + value[11];
        }

        if (value.slice(4, 9) == "00000") {
            return value.slice(0, 4) + value.slice(9, 11) + "3" + value[11];
        }

        if (value.slice(5, 10) == "00000") {
            return value.slice(0, 5) + value.slice(10, 11) + "4" + value[11];
        }

        if (value.slice(6, 10) == "0000" && value[11] >= 5 && value[11] <= 9) {
            return value.slice(0, 6) + value[10] + value[11];
        }

        return value;
    }
}

export default UPCA;