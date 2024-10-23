import DigitalLink from "./gs1/digital-link.js";
import Elements from "./gs1/elements.js";
import Symbologies from "./symbologies.js";

class GS1 {

    static parse(result) {
        let elements = [];

        /* Decode GS1 data if we have a FNC1 character or a GS character */

        if (result.fnc1 || result.value.includes(String.fromCharCode(29))) {
            elements = Elements.parse(result.value);
        }

        /* Decode GS1 data if it is a GS1 Digital Link */

        else if (DigitalLink.is(result.value)) {
            elements = DigitalLink.parse(result.value);
        }

        /* Decode GS1 data if it is a GS1 DataBar */

        else if (result.symbology.startsWith('gs1-databar')) {
            elements = Elements.parse(result.value);
        }

        /* Extract data from EAN and UPC barcodes */

        else if (['upca','ean8','ean13'].includes(result.symbology)) {
            elements = [
                { ai: '01', label: 'GTIN', value: result.value.padStart(14, '0') }
            ];
        }

        if (result.symbology === 'upce') {
            elements = [
                { ai: '01', label: 'GTIN', value: Symbologies.UPCE.expand(result.value).padStart(14, '0') }
            ];
        }

        /* Prepare return value */

        if (elements.length) {
            let data = {
                elements
            };

            let gtin = elements.find(e => e.ai === '01');
            if (gtin) {
                data.gtin = gtin.value;
            }

            return data;
        }
    }
}


export default GS1;
