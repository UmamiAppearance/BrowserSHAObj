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
The constructor takes one argument for the ``algorithm`` which is set to ``SHA-256`` by default. Available options are:
* ``SHA-1``
* ``SHA-256``
* ``SHA-384``
* ``SHA-512``

There a two possible methods available to create an instance:

#### new operator
```js
// default, SHA-256
const sha256 = new SHAObj();

// SHA-512
const sha512 = new SHAObj("SHA-512");
```

#### new method
```js
// default, SHA-256
const sha256 = await SHAObj.new();

// SHA-512
const sha512 = await SHAObj.new("SHA-512");
```

The method is asynchronous to allow you to associate a message in one go.
```js
// SHA-512
const sha512 = await SHAObj.new("SHA-512", "Hello World!");
```


### Methods and Properties


#### Static

##### ``SHAObj.algorithmsAvailable()``
A set containing the names of the hash algorithms that are available.

##### ``SHAObj.algorithmsGuaranteed()``
Added for the sake of completeness in terms of compatibility with [pythons hashlib](https://docs.python.org/3/library/hashlib.html). Here it is pointing to [``algorithmsAvailable``](#shaobjalgorithmsavailable).

##### ``SHAObj.new(algorithm, input)``
Asynchronously creates a new instance. Optionally takes the ``algorithm`` as the first parameter, also an optional input which can be provided as the second parameter, and gets passed to the [``update``](#update) method.


#### Instance

##### ``digest_size`` _(property)_
The size of the resulting hash in bytes.

##### ``block_size`` _(property)_
The internal block size of the hash algorithm in bytes.

##### ``name`` _(property)_
The canonical name of this hash, always uppercase and always suitable as a parameter to create another hash of this type.

##### ``update(input[, replace=false])``
Update the hash object with almost any input. The input gets converted to a ``Uint8Array``. Unless ``replace`` is set to true, repeated calls are equivalent to a single call with the concatenation of all the arguments:  
``shaObj.update(a)``; ``shaObj.update(b)`` is in many occasions equivalent to ``shaObj.update(a+b)``.  
  
_(Note: The process is a concatenation of bytes. Take as an exception for instance ``shaObj.update(1)``; ``shaObj.update(2)``, which is not the same as ``shaObj.update(1+2)``)_


#### Examples for creating a new Object:

```js
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
