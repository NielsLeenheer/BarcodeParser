import { labels, fixedLength } from './data.js';

const GS = String.fromCharCode(29);

class Elements {

    static parse(data) {
        let elements = [];

        /* Split the data into elements */

        let segments = data.split(GS);

        for (let segment of segments) {
            while (segment.length) {
                let ai = segment.substr(0, 2);

                if (ai in fixedLength) {
                    elements.push({ value: segment.substr(0, fixedLength[ai]) });
                    segment = segment.substr(fixedLength[ai]);
                }
                else {
                    elements.push({ value: segment });
                    segment = '';
                }
            }
        }

        /* Parse the elements */

        for (let element of elements) {
            let aiSize;

            for (let i = 2; i <=4; i++) {
                if (element.value.substr(0, i) in labels) {
                    aiSize = i;
                    break;
                }
            }

            if (aiSize) {
                element.ai = element.value.substr(0, aiSize);
                element.value = element.value.substr(aiSize);
                element.label = labels[element.ai];
            }
        }
        
        return elements;
    }
}

export default Elements;