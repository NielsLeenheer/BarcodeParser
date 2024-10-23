class Aim {

    static decode(aim, value) {
        let data = {
            symbology: null
        };

        let code = aim[1];
        let modifier = aim[2];

        switch (code) {
            case 'A': data.symbology = 'code39'; break;
            case 'B': data.symbology = 'telepen'; break;
            case 'C': 
                data.symbology = 'code128'; 

                if (modifier === '1') {
                    data.symbology = 'gs1-128'; 
                    data.fnc1 = 1;
                }

                break;

            case 'D': data.symbology = 'code1'; break;
            case 'E': 

                if (value.length === 13) {
                    data.symbology = 'ean13';
                }

                else if (value.length === 12) {
                    data.symbology = 'upca';
                }

                else if (value.length === 8) {
                    if (modifier === '4') {
                        data.symbology = 'ean8';
                    }
                    else {
                        data.symbology = 'upce';
                    }
                }
            
                break;
            case 'F': data.symbology = 'codabar'; break;
            case 'G': data.symbology = 'code93'; break;
            case 'H': data.symbology = 'code11'; break;
            case 'I': data.symbology = 'interleaved-2-of-5'; break;
            case 'K': data.symbology = 'code16k'; break;
            case 'L': data.symbology = 'pdf417'; break;
            case 'M': data.symbology = 'msi'; break;
            case 'N': data.symbology = 'anker'; break;
            case 'O': 
                if (modifier === '4' || modifier === '5') {
                    data.symbology = 'codablock-f'; 
                }

                if (modifier === '6') {
                    data.symbology = 'codablock-a'; 
                }

                break;

            case 'P': data.symbology = 'plessey'; break;
            case 'R': data.symbology = 'straight-2-of-5'; break;
            case 'S': data.symbology = 'straight-2-of-5'; break;
            case 'Q': 
                data.symbology = 'qr-code'; 

                if (modifier === '0') {
                    data.model = 1;
                }

                else {
                    data.model = 2;

                    if (modifier === '3' || modifier === '4') {
                        data.fnc1 = 1;                         
                    }
                    
                    if (modifier === '5' || modifier === '6') {
                        data.fnc1 = 2;
                    }
                }

                break;
            case 'U': data.symbology = 'maxicode'; break;
            case 'X': 
                /* Other barcode */

                /* According to Honeywell, this is the identifier for Bookland/ISSN EAN-13 */
                
                if (modifier === '0') {
                    data.symbology = 'ean13';
                }

                /* Zebra / Motorola uses it for duplicate identifiers already defined by AIM */

                else {
                    switch(modifier) {
                        case '9': data.symbology = 'ean13'; break;
                        case 'C': data.symbology = 'ean8'; break;
                        case 'g': data.symbology = 'upca'; break;
                        case 'k': data.symbology = 'upce'; break;
                        case 'r': data.symbology = 'gs1-databar-omni'; break;
                        case 's': data.symbology = 'gs1-databar-limited'; break;
                        case 't': data.symbology = 'gs1-databar-expanded'; break;
                        case 'V': data.symbology = 'pdf417'; break;
                        case 'S': data.symbology = 'qr-code-micro'; break;
                    }
                }

                break;

            case 'c': data.symbology = 'channel-code'; break;
            case 'd': 
                data.symbology = 'data-matrix'; 
                
                if (modifier === '2' || modifier === '5') {
                    data.fnc1 = 1;
                }

                if (modifier === '3' || modifier === '6') {
                    data.fnc1 = 2;
                }

                break;

            case 'e': data.symbology = 'gs1-databar-omni'; break;
            case 'h': data.symbology = 'chinese-sensible-code'; break;
            case 'o': data.symbology = 'ocr'; break;
            case 'p': data.symbology = 'posi-code'; break;
            case 's': data.symbology = 'super-code'; break;
            case 'z': 
                data.symbology = 'aztec-code'; 
                
                if (modifier === '1' || modifier === '4' || modifier === '7' || modifier === 'A') {
                    data.fnc1 = 1;
                }

                if (modifier === '2' || modifier === '5' || modifier === '8' || modifier === 'B') {
                    data.fnc1 = true;           /* Following an initial letter or pair of digits */
                }

                break;
        }

        return data;
    }
}

export default Aim;