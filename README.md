# SHAHashObj

## Description
__SHAHashObj__ creates a SHA-(1-512) object, that holds a typed array of the output for the given algorithm.
With the use of [BaseEx](https://github.com/UmamiAppearance/BaseExJS), the hashsum can be exported to multible data representations.  [-> learn more](#Returned-object))
___

## Constructor
        
Two arguments are taken by the constructor:
* ``message``
* ``algorithm``
* 
The ``message`` is set to ``null`` by default. If it is not overwritten the created object does not hold a digested array of the input. This has the advantage, that any new input can be called asynchronously and ``await``ed for.

The ``algorithm`` is set to ``SHA-256`` by default. This can be changed to:
* ``SHA-1``
* ``SHA-256``
* ``SHA-384``
* ``SHA-512``
___

## Returned object

The returned object holds an array of the digested hash buffer (``obj.array``).  

The message can be updated with ``obj.update(message)``

There are multiple functions available to show a representation of the hash. They all (with one exception) return a string of a different kind (binary, hexadecimal, base36...). Those functions are called like this: ``obj.toRepresentation()``  

Available functions are:
* ``toHex()``
* ``toOct()``
* ``toDec()``
* ``toHex()``
* ``toBase36()``
* ``toBase64()``

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

