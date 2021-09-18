// esm-moldule import (disabled for default js)
//import {BaseEx} from "../lib/BaseEx.esm.min.js"


// loading classic script tag if not present (deactivated for esm-module)
function importBaseEx() {
    const script = document.createElement("script");
    script.src = "lib/BaseEx.min.js";
    document.querySelector("head").appendChild(script);
}
importBaseEx();

class SHAHashObj {
    /*
        Creates a SHA-(1-512) object, that holds an array
        of the output for the given algorithm. Multiple
        representations of the message-digest are available.
        
        Three arguments are taken by the constructor.
            * message
            * algorithm
            * utf8Input
        
        The message is set to "null" by default. If it is not
        overwritten the created object does not hold the processed
        array of the input. This has the advantage, that any new
        input can be called asynchronously and awaited for.

        The algorithm is set to SHA-256 by default.

        Also by default all input is converted into a Uint8Array.
        This can be disabled (by setting "utf8Input" to false).
        In this case other ArrayBuffers can be used as input.
    */

    constructor(message=null, algorithm="SHA-256", utf8Input=true) {
        const algorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
        algorithm = `SHA-${String(algorithm).match(/[0-9]+/)[0]}`;                      // simplify the input for the user - sha1, Sha-256... everything is fine, even 384 by itself, as long as the numbers match to the provided algorithms
        if (!algorithms.includes(algorithm)) {
            throw new Error(`Ivalid algorithm.\nValid arguments are: "${algorithms.join(", ")}".`);
        }

        this.algorithm = algorithm;
        this.utf8Input = utf8Input;

        this.hash = {};
        this.hash.array = null;
        this.hash.update = this.makeHashArray.bind(this);

        if (message !== null) this.makeHashArray(message);

        return this.hash;
    }

    async makeHashArray(message) {
        /*
            Digests the given message and stores an array from the hash buffer.
        */
        const msgArray = (this.utf8Input) ? new TextEncoder().encode(message) : message;        // encode as (utf-8) Uint8Array (if not disabled)
        const hashBuffer = await window.crypto.subtle.digest(this.algorithm, msgArray);         // hash the message
        this.hash.array = new Uint8Array(hashBuffer);                                           // convert buffer to byte array
        this.addConverters();
    }

    async addConverters() {
        /*
            Appends methods for getting common representations
            of the hash array to the returned object.
        */
        if (this.hash.hasConverters) return;
        
        const capitalize = str => str.charAt(0).toUpperCase().concat(str.slice(1));
        
        if (typeof(BaseEx) === "undefined") {
            throw new Error("Library 'BaseEx' has not yet loaded.\nMake sure that this is the case. (e.g. initializing SHAHashOj via a load EventListener");
        }
        
        const baseEx = new BaseEx("bytes");
        const converters = Object.keys(baseEx).slice(1); 
        
        this.hash.toHex = () => baseEx.base16.encode(this.hash.array);
        
        for (const converter of converters) {
            this.hash[`to${capitalize(converter)}`] = () => baseEx[converter].encode(this.hash.array);
        }
        this.hash.hasConverters = true;
    }
}

x = new SHAHashObj();
x.update("test");