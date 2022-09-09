# BrowserSHAObj

[![License](https://img.shields.io/github/license/UmamiAppearance/BrowserSHAObj?color=009911&style=for-the-badge)](./LICENSE)
[![npm](https://img.shields.io/npm/v/browser-sha-obj?color=%23009911&style=for-the-badge)](https://www.npmjs.com/package/browser-sha-obj)


**BrowserSHAObj** creates a SHA-(1/256/384/512) object. It is very closely related to [pythons hashlib](https://docs.python.org/3/library/hashlib.html) in its methods and features. It provides an easy access to the browsers ``Crypto.subtle`` method, and also makes it possible to get multiple different digest methods with a little help of [BaseEx](https://github.com/UmamiAppearance/BaseExJS).

## Installation

### GitHub
```sh
git clone https://github.com/UmamiAppearance/BrowserSHAObj.git
```

### npm
```sh
nmp install browser-sha-obj
```

## Builds
You can find builds in [dist](https://github.com/UmamiAppearance/BrowserSHAObj/tree/main/dist). If you want to build by yourself run:

```sh
npm run build
``` 

Two types are available ([esm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and [iife](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)), plus a minified version of each. 
* ``BrowserSHAObj.esm.js``
* ``BrowserSHAObj.esm.min.js``
* ``BrowserSHAObj.iife.js``
* ``BrowserSHAObj.iife.min.js``


## Usage

### Importing
BrowserSHAObj is a ESM module and exported as _default_. Importing works as follows:
```js
// esm
import SHAObj from "./path/BrowserSHAObj.esm.min.js";
```
```html
<!-- script tag -->
<script src="path/BrowserSHAObj.iife.min.js"></script>
```

### Creating an instance
        
Two arguments are taken by the constructor:
* ``algorithm`` (default: SHA-256)
* ``message`` (default: null)

The ``algorithm`` is set to ``SHA-256`` by default. Available options are:
* ``SHA-1``
* ``SHA-256``
* ``SHA-384``
* ``SHA-512``

The default for ``message`` is ``null`` (possible input types are described [here](#returned-object)). If it is not overwritten the created object does not hold a digested array of a message input (yet). This has the advantage, that any (new) input update can be called asynchronously and ``await``ed for.

#### Examples for creating a new Object:

```js
// default, SHA-256, no message associated
const sha256obj = new SHAObj();

// SHA-512, no message associated
const sha512obj = new SHAObj("SHA-512");

// SHA-1, with message associated (Setting the message
// during initialization makes it a synchronous call. 
// You have been warned!)
const sha1obj = new SHAObj("SHA-1", "Hello World!");
```

#### Returned Object
The returned object holds a typed array (**UInt8**) of the digested hash buffer (``obj.array``). The message can be updated with ``obj.update(message)``. The call returns a _Promise_.  
  
``message`` accepts as input type:
* **String**
* **Typed Array**
* **ArrayBuffer**

#### Examples for updating the message:
```js
// string input with await statement
await sha256obj.update("digest me!");

// bytes as input with a '.then()' block
const bytesInput = new Uint8Array([69, 97, 115, 116, 101, 114, 101, 103, 103, 33]);
sha256obj.update(bytesInput).then(() => ... );
```

#### Representations
There are multiple functions available to receive a digested representation of the hash (those are build in methods of [BaseEx](https://github.com/UmamiAppearance/BaseExJS)). They are all returning a string of a different kind (hexadecimal, base32, base64...). Those functions are called like this: ``obj.toRepresentation()``  

Available methods are:
* ``toHex()``
* ``toBase32_rfc3548()​​``
* ``toBase32_rfc4648()​​``
* ``toBase64()​​``
* ``toBase64_urlsafe()​​``
* ``toBase85_z85()​​``
* ``toBase85adobe()​​``
* ``toBase85ascii()​​``
* ``toBase91()``

##### Examples for data representations:
```js
// hexadecimal
sha256obj.toHex();

// base32
sha256obj.toBase32_rfc3548();

// base64
sha256obj.toBase64();
```

## See it in action (demo page)
To get a better idea of a possible use case, take a look at the [Demopage](https://umamiappearance.github.io/BrowserSHAObj/demo.html).
