# BarcodeParser

[![npm](https://img.shields.io/npm/v/@point-of-sale/barcode-parser)](https://www.npmjs.com/@point-of-sale/barcode-parser)
![GitHub License](https://img.shields.io/github/license/NielsLeenheer/BarcodeParser)


> This library is part of [@point-of-sale](https://point-of-sale.dev), a collection of libraries for interfacing browsers and Node with Point of Sale devices such as receipt printers, barcode scanners and customer facing displays.

<br>

## What does this library do?

This library provides common barcode parsing functions used by the [WebHIDBarcodeScanner](https://github.com/NielsLeenheer/WebHIDBarcodeScanner), [WebSerialBarcodeScanner](https://github.com/NielsLeenheer/WebSerialBarcodeScanner), [WebcamBarcodeScanner](https://github.com/NielsLeenheer/WebcamBarcodeScanner) and [KeyboardBarcodeScanner](https://github.com/NielsLeenheer/KeyboardBarcodeScanner) libraries. 

<br>

## How to use it?

This library is not intended to be used as a standalone direct dependancy. There is no guarantee for a stable API.

To use this library you first need to install it:

```
npm i @point-of-sale/barcode-parser
```

And import it:


```js
import { Aim, GS1, Detector, Symbologies } from '@point-of-sale/barcode-parser';
```

<br>

### AIM

Some barcode scanners give back an AIM Code Identifier which gives information about the barcode symbology and certain other options.

To parse the AIM Code Identifier call the `Aim.decode()` function. It requires two parameters: the 3 character AIM Code Indentifier, starting with a `[`, and the remaining value of the barcode.

```js
let result = Aim.decode(']E0', '3046920029759');
```

The result will be an object with a key for the symbology:

```js
{
    symbology: 'ean13'
}
```

Optionally there will be a key `model` for the QR code model and a key `fnc1` that tells us if the `FNC1` character is the first of second character of the encoded data. 

<br>

### GS1

Retail and warehouses often use barcodes that encode GS1 data. For example ITF14, EAN and UPC barcodes encode the GS1 GTIN. Additionally a GS1 Digital Link QR Code, GS1 Datamatrix, GS1-128 or GS1 Databar can encode other GS1 elements.

To parse the GS1 data from a barcode you can call the `GS1.decode()` function. It only requires one parameter, an object with the following properties:

-   `value`<br>
    The value of the barcode, for example: `3046920029759`.
-   `symbology`<br>
    The symbology of the barcode, for example: `ean13`.
-   `fnc1`<br>
    Optionally the value of the `fnc1` property returned by the `AIM.decode()` function.

```js
let result = GS1.decode({ 
    value:      '3046920029759',
    symbology:  'ean13'
});
```

Or

```js
let result = GS1.decode({ 
    value:      '010304692002975915251031',
    symbology:  'gs1-128',
    fnc1:       1
});
```

Or:

```js
let result = GS1.decode({ 
    value:      'https://example.com/01/03046920029759?15=251031',
    symbology:  'qr-code'
});
```

The first one will result in an object with the GS1 GTIN as the only element:

```js
{
    gtin: '03046920029759',
    elements: [
        { 
            ai: '01',
            label: 'GTIN',
            value: '03046920029759'
        }
    ]
}
```

The two below that will get an object with two elements:

```js
{
    gtin: '03046920029759',
    elements: [
        { 
            ai: '01',
            label: 'GTIN',
            value: '03046920029759'
        }, { 
            ai: '15',
            label: 'BEST BEFORE or BEST BY',
            value: '251031'
        }
    ]
}
```

The object that is returned contains the following properties:

-   `gtin`<br>
    Optionally, when the barcode contains a GTIN, the value of the GTIN.
-   `elements`<br>
    An array for each element of the GS1 data. Each element is an object with an `ai` property for the application id, an `label` property containing a human readable description and `value` for the value of the element.

<br>

### Detector

Guess the symbology based on the format of the barcode. Call the `Detector.detect()` function with the barcode data as a parameter.

```js
let result = Detector.detect('3046920029759')
```

This results in an object with the following properties:

-   `symbology`<br>
    The likely symbology for this barcode. It's a guess, but sometimes an educated guess.
-   `guess`<br>
    Boolean that indicates if it is a completely guess, or if there if we're certain about our guess.

The example above will result this:

```js
{
    symbology: 'ean13',
    guess: false
}
```

The barcode contains 13 digits, which makes it likely that it is a EAN-13 barcode. Additionally we've verified that the last digit is indeed the correct check digit, so we're pretty sure it is actually an EAN-13 barcode.

If the detector cannot make a determination what type of barcode it is, the function will return `undefined`.

<br>

### Symbologies

Functions that help with specific symbologies. Right now there is only one function defined, for helping with UPC-E barcodes.

#### UPC-E

UPC-E barcodes are similar to UPC-A barcodes, but zero's in the barcode value are compressed, making the barcode physically smaller. Call the `Symbologies.UPCE.expand()` function to convert the compressed UPC-E barcode back to it's original value.

```js
let result = Symbologies.UPCE.expand('02345673')
```

Will result in a string with the following value: `023456700003`.

<br>

-----

<br>

This library has been created by Niels Leenheer under the [MIT license](LICENSE). Feel free to use it in your products. The  development of this library is sponsored by Salonhub.

<a href="https://salonhub.nl"><img src="https://salonhub.nl/assets/images/salonhub.svg" width=140></a>
