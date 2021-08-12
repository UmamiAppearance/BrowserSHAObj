# SHAHashObj

## Description
__SHAHashObj__ creates a SHA-(1-512) object, that holds an array of the output for the given algorithm.
Multiple representations of the message-digest are available (e.g. binary, hexadecimal, base64... [-> learn more](#Returned-object)).
___

## Constructor
        
Three arguments are taken by the constructor:
* ``message``
* ``algorithm``
* ``utf8Input``

The message is set to ``null`` by default. If it is not overwritten the created object does not hold a digested array of the input. This has the advantage, that any new input can be called asynchronously and awaited for.

The _algorithm_ is set to __SHA-256__ by default. This can be changed to:
* ``SHA-1``
* ``SHA-256``
* ``SHA-384``
* ``SHA-512``


Also by default all input is converted into a __Uin8Array__ before digestion. This can be disabled (by setting _utf8Input_ to _false_). In this case other ArrayBuffers can be used as input.
___

## Returned object

The returned object holds an array of the digested hash buffer (``obj.array``).  

The message can be updated with ``obj.update(message)``

There are multiple functions available to show a represeantation of the hash. They all (with one exception) return a string of a different kind (binary, hexadecimal, base36...). Those functions are called like this: ``obj.toRepresentation()``  

Available fuctions are:
* ``toBin()``
* ``toOct()``
* ``toDec()``
* ``toHex()``
* ``toBase36()``
* ``toBase64()``
* ``toBase(radix)`` -> value between 2-36
* ``toInt()``  -> returns an actual integer

___

## Usage

___Create an object:___
```js
// default, SHA-256, no message associated
const sha256obj = new SHAHashObj();

// SHA-512, no message associated
const sha512obj = new SHAHashObj(null, "SHA-512");

// SHA-1, with message associated
const sha1obj = new SHAHashObj("Hello World!", "SHA-1");

```
___Updating the message:___
```js
await sha256obj.update("digest me!");
```

___Get representations:___
```js
// hexadecimal
sha256obj.toHex();

// binary
sha256obj.toBin();

// base64
sha256obj.toBase64();

// custom radix between 2 and 36
sha256obj.toBase(12);

```

