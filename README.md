# SHAHashObj

### Description
__SHAHashObj__ creates a SHA-(1-512) object, that holds an array of the output for the given algorithm.
Multiple representations of the message-digest are available (e.g. binary, hexadecimal, base64... [-> learn more](#Returned-object)).

### Constructor
        
Three arguments are taken by the constructor:
* _message_
* _algorithm_
* _utf8Input_

The message is set to _null_ by default. If it is not overwritten the created object does not hold a digested array of the input. This has the advantage, that any new input can be called asynchronously and awaited for.

The _algorithm_ is set to __SHA-256__ by default.

Also by default all input is converted into a __Uin8Array__ before digestion. This can be disabled (by setting _utf8Input_ to _false_). In this case other ArrayBuffers can be used as input.

___

### Usage

To create a new object like this:


___

### Returned object

The
