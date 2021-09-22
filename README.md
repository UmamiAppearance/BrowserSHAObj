# SHAHashObj

__SHAHashObj__ creates a SHA-(1-512) object, that holds a typed array of the output for the given algorithm. The idea is to simplify the use of the buildin ``Crypto.subtle`` methods for hashsum generation of modern **browsers**.
With the help of [BaseEx](https://github.com/UmamiAppearance/BaseExJS), the hashsum can be exported to multible data representations.  [-> learn more](#representations)

## Installation


## Usage

### Constructor
        
Two arguments are taken by the constructor:
* ``algorithm`` (default: SHA-256)
* ``message`` (default: null)

The ``message`` is set to ``null`` by default (possible input types are decribed [here](#returned-object)). If it is not overwritten the created object does not hold a digested array of the input. This has the advantage, that any new input can be called asynchronously and ``await``ed for. This should always be first choice.

The ``algorithm`` is set to ``SHA-256`` by default. Available options are:
* ``SHA-1``
* ``SHA-256``
* ``SHA-384``
* ``SHA-512``

#### Examples for creating a new Object:

```js
// default, SHA-256, no message associated
const sha256obj = new SHAHashObj();

// SHA-512, no message associated
const sha512obj = new SHAHashObj("SHA-512");

// SHA-1, with message associated (Setting the message during initialization makes it a synchronous call. You have been warned!)
const sha1obj = new SHAHashObj("SHA-1", "Hello World!");
```

### Returned Object
The returned object holds a typed array (**UInt8**) of the digested hash buffer (``obj.array``).  

The message can be updated with ``obj.update(message)``, a Promise is returned.  
``message`` takes as input:
* String
* Typed Array
* Arraybuffer

#### Examples for updating the message:
```js
// string input with await statement
await sha256obj.update("digest me!");

// bytes as input with a '.then()' block
const bytesInput = new Uint8Array([69, 97, 115, 116, 101, 114, 101, 103, 103, 33]);
sha256obj.update(bytesInput).then(() => ... );
```

### Representations
There are multiple functions available to show a digested representation of the hash (those are buildin methods of [BaseEx](https://github.com/UmamiAppearance/BaseExJS)). They are all returning a string of a different kind (hexadecimal, base32, base64...). Those functions are called like this: ``obj.toRepresentation()``  

Available functions are:
* ``toHex()``
* ``toBase32_rfc3548()​​``
* ``toBase32_rfc4648()​​``
* ``toBase64()​​``
* ``toBase64_urlsafe()​​``
* ``toBase85_z85()​​``
* ``toBase85adobe()​​``
* ``toBase85ascii()​​``
* ``toBase91()``

#### Examples for data representions:
```js
// hexadecimal
sha256obj.toHex();

// base32
sha256obj.toBase32_rfc3548();

// base64
sha256obj.toBase64();
```

### See it in action (Demopage)
To get a better idea of a possible usecase, take a look at the [Demopage](https://umamiappearance.github.io/SHAHashObjectJS/demo.html).
