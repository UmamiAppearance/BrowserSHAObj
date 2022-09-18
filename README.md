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
import BrowserSHAObj from "./path/BrowserSHAObj.esm.min.js";

// esm from CDN (jsdelivr)
import BrowseSHAObj from "https://cdn.jsdelivr.net/npm/browser-sha-obj@latest/dist/BrowserSHAObj.esm.min.js"
```

```html
<!-- script tag -->
<script src="./path/BrowserSHAObj.iife.min.js"></script>

<!-- script tag from CDN (jsdelivr)-->
<script src="https://cdn.jsdelivr.net/npm/browser-sha-obj@latest/dist/BrowserSHAObj.iife.min.js"></script>
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

##### ``BrowserSHAObj.algorithmsAvailable()``
A set containing the names of the hash algorithms that are available.

##### ``BrowserSHAObj.algorithmsGuaranteed()``
Added for the sake of completeness in terms of compatibility with [pythons hashlib](https://docs.python.org/3/library/hashlib.html). Here it is simply pointing to [``algorithmsAvailable``](#browsershaobjalgorithmsavailable).

##### ``BrowserSHAObj.new(algorithm, input)``
Asynchronously creates a new instance. Optionally takes the ``algorithm`` as the first parameter, also an optional ``input`` which can be provided as the second parameter, and gets passed to the [``update``](#updateinput-replacefalse) method.


#### Instance

##### ``digestSize`` _(property)_
The size of the resulting hash in bytes.

##### ``blockSize`` _(property)_
The internal block size of the hash algorithm in bytes.

##### ``name`` _(property)_
The canonical name of this hash, always uppercase and always suitable as a parameter to create another hash of this type.

##### ``update(input[, replace=false])``
Update the hash object with almost any input. The input gets converted to a ``Uint8Array``. Unless ``replace`` is set to true, repeated calls are equivalent to a single call with the concatenation of all the arguments:  
``shaObj.update(a)``; ``shaObj.update(b)`` is in many occasions equivalent to ``shaObj.update(a+b)``.  
  
_(Note: The process is a concatenation of bytes. Take as an exception for instance ``shaObj.update(1)``; ``shaObj.update(2)``, which is not the same as ``shaObj.update(1+2)``)_


##### ``replace(input)``
Replace the the hash object with fresh input (the same as ``update(input, true)``).

##### ``digest()``
Return the digest of the data passed to the [``update``](#updateinput-replacefalse) method so far. This is an ``ArrayBuffer`` of size [``digestSize``](#digestsize-property).


##### ``hexdigest()``
Like [``digest``](#digest) except the digest is returned as a string of double length, containing only hexadecimal digits. This may be used (as one of many options) to exchange the value safely in non-binary environments.

##### ``basedigest`` _(object)_
Provides many different methods to covert the digest into different base representations. Take a look at the [live-examples](https://umamiappearance.github.io/BrowserSHAObj/examples/live-examples.html#base-representations), to see it in action.  
Every ``basedigest`` optionally takes additional [BaseEx Parameters](https://github.com/UmamiAppearance/BaseExJS#options).

##### ``copy()``
Async method to return a copy/clone of the hash object. This can be used to efficiently compute the digests of data sharing a common initial substring.


## Examples
[Here](https://umamiappearance.github.io/BrowserSHAObj/examples/live-examples.html) you can find many live-examples. To get a better idea of a possible use case, take a look at the [Online SHA Checksum Calculator](https://umamiappearance.github.io/BrowserSHAObj/examples/calculator.html).


## License
This work is licensed under [GPL-3.0](https://opensource.org/licenses/GPL-3.0).
