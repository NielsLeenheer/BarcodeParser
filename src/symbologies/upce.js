

class UPCE {

    static expand(value) {
        
        /* Digits 2 to 7 (UPC-E has a leading digit) */
        const digits = value.substring(1, 7); 
        
        /* The last digit (check digit) */
        const lastDigit = value.charAt(7); 

        let result = '';

        switch (digits.charAt(5)) {
            case '0':
            case '1':
            case '2':
                // If the 4th digit is 0, 1, or 2: Expand to form 0XXX00NNNN
                result = value.charAt(0) + digits.substring(0, 2) + digits.charAt(5) + "0000" + digits.substring(2, 5);
                break;
            case '3':
                // If the 4th digit is 3: Expand to form 0XXX00000NNNN
                result = value.charAt(0) + digits.substring(0, 3) + "00000" + digits.substring(3, 5);
                break;
            case '4':
                // If the 4th digit is 4: Expand to form 0XXXX00000NNNN
                result = value.charAt(0) + digits.substring(0, 4) + "00000" + digits.charAt(4);
                break;
            default:
                // If the 4th digit is 5-9: Expand to form 0XXXXXNNNN
                result = value.charAt(0) + digits + "0000";
                break;
        }
    
        result += lastDigit;

        return result;
    }
}

export default UPCE;