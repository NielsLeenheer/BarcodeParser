import { labels, patterns, checkDigitPositions } from './data.js';

class DigitalLink {

    static is(data) {
        return typeof data === 'string' && (        
            data.match(/^(https?|HTTPS?):(\/\/((([^\/?#]*)@)?([^\/?#:]*)(:([^\/?#]*))?))?([^?#]*)(((\/(01|8006|8013|8010|414|415|417|8017|8018|255|00|253|401|402|8003|8004|240)\/)(\d{4}[^\/]+)(\/[^/]+\/[^/]+)?[/]?(\?([^?\n]*))?(#([^\n]*))?))/) ||
            data.match(/^(https?|HTTPS?):(\/\/((([^\/?#]*)@)?([^\/?#:]*)(:([^\/?#]*))?))?([^?#]*)((\/[0-9A-Za-z_-]{10,}$))/)
        );
    }
   
	static calculateCheckDigit(ai, value) {
		let counter = 0;
		let total = 0;

        let checkDigitPosition = checkDigitPositions[ai] === "L" ? value.length : checkDigitPositions[ai];
        
		for (let i = checkDigitPosition - 2; i >= 0; i--) {
			let digit = value.charAt(i);
            let multiplier;

			if (counter % 2 === 0) {
				multiplier = 3;
			} else {
				multiplier = 1;
			}

			total += digit * multiplier;
			counter++;
		}

		return (10 - (total % 10)) % 10;
	}

	static verifyCheckDigit(ai, value) {
        if (!checkDigitPositions[ai]) {
            return true;
        }

        let checkDigitPosition = checkDigitPositions[ai] === "L" ? value.length : checkDigitPositions[ai];
        let actualCheckDigit = parseInt(value.charAt(checkDigitPosition - 1), 10);
        let expectedCheckDigit = DigitalLink.calculateCheckDigit(ai, value);

        if (actualCheckDigit !== expectedCheckDigit) { 
            console.log(`Invalid check digit: An invalid check digit was found for the primary identification key (${ai})${value}; the correct check digit should be ${expectedCheckDigit} at position ${checkDigitPosition}`);
            return false;
        }

        return true;
	}

	static verifySyntax(ai, value) {
		let re = new RegExp("^" + patterns[ai] + "$");

		if (!re.test(value)) {
			console.log(`Syntax error: Invalid syntax for value of (${ai}): ${value}`);
            return false;
		}

        return true;
	}

    static parse(link) {
        let candidates = [];

        /* Extract the AI and value pairs from the link */

        let url = new URL(link);

        if (url.pathname != '/') {
            let pairs = url.pathname.substr(1).split('/');

            while (pairs.length >= 2) {
                candidates.push([ pairs.shift(), decodeURIComponent(pairs.shift()) ]);
            }
        }
        
        if (url.search != '') {
            let pairs = [ ...(new URLSearchParams(url.search.replace(/;/, '&'))) ];

            for (let [ai, value] of pairs) {
                candidates.push([ ai, value ]);
            }
        }

        /* Verify the syntax and check digits of the elements */
        
        let elements = [];
                
        for (let [ai, value] of candidates) {
            let valid = true;
            valid &= DigitalLink.verifySyntax(ai, value);
            valid &= DigitalLink.verifyCheckDigit(ai, value)

            if (valid) {
                if (ai == "01" || ai == "02") {
                    value = value.padStart(14, '0');
                }

                elements.push({
                    ai,
                    value,
                    label: labels[ai]
                });
            }
        }

        /* Sort elements by AI */

        elements.sort((a, b) => {
            return a.ai.localeCompare(b.ai);
        });
                            
        return elements;
    }
}

export default DigitalLink;