class Detector {
    
    static checkdigit(barcode) {
        const digits = barcode.split('').map(i => parseInt(i, 10)).reverse();
    
        const total = digits.reduce((acc, number, i) => {
            return acc + (i % 2 === 1 ? number : number * 3);
        }, 0);
    
        return (Math.ceil(total / 10) * 10) - total;
    }

    static detect(barcode) {
        if (barcode.startsWith('http')) {
            return { symbology: 'qr-code', guess: true };
        }

        else if (barcode.startsWith('X-HM:')) {
            return { symbology: 'qr-code', guess: false };
        }

        else if (barcode.startsWith('MT:')) {
            return { symbology: 'qr-code', guess: false };
        }

        else if (barcode.startsWith('WIFI:')) {
            return { symbology: 'qr-code', guess: false };
        }

        else if (barcode.match(/^[0-9]+$/) && barcode.length == 8) {            
            if (Detector.checkdigit(barcode.slice(0, -1)) == barcode.slice(-1)) {
                return { symbology: 'ean8', guess: false };
            }
        }

        else if (barcode.match(/^[0-9]+$/) && barcode.length == 12) {
            if (Detector.checkdigit(barcode.slice(0, -1)) == barcode.slice(-1)) {
                return { symbology: 'upca', guess: false };
            }
        }

        else if (barcode.match(/^[0-9]+$/) && barcode.length == 13) {
            if (Detector.checkdigit(barcode.slice(0, -1)) == barcode.slice(-1)) {
                return { symbology: 'ean13', guess: false };
            }
        }

        else if (barcode.match(/^M[0-9]/)) {
            return { symbology: 'aztec-code', guess: true };
        }

        else if (barcode.length > 128) {
            return { symbology: 'pdf417', guess: true };
        }

        else if (barcode.length > 32) {
            return { symbology: 'qr-code', guess: true };
        }
    }
}

export default Detector;