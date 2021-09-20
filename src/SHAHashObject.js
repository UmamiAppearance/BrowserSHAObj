// esm-moldule import (disabled for default js)
import {BaseEx} from "../lib/BaseEx.esm.min.js"

// loading classic script tag if not present (deactivated for esm-module)
/*
function importBaseEx() {
    const script = document.createElement("script");
    script.src = "lib/BaseEx.min.js";
    document.querySelector("head").appendChild(script);
}
importBaseEx();
*/

class SHAHashObj {
    /*
        Creates a SHA-(1-512) object, that holds an array
        of the output for the given algorithm. Multiple
        representations of the input-digest are available.
        
        Three arguments are taken by the constructor.
            * input
            * algorithm
        
        The input is set to "null" by default. If it is not
        overwritten the created object does not hold the processed
        array of the input. This has the advantage, that any new
        input can be called asynchronously and awaited for.

        The algorithm is set to SHA-256 by default.

        Also by default all input is converted into a Uint8Array.
        This can be disabled (by setting "utf8Input" to false).
        In this case other ArrayBuffers can be used as input.
    */

    constructor(input=null, algorithm="SHA-256") {
        const algorithms = this.constructor.getAlgorithms();
        algorithm = `SHA-${String(algorithm).match(/[0-9]+/)[0]}`;                      // simplify the input for the user - sha1, Sha-256... everything is fine, even 384 by itself, as long as the numbers match to the provided algorithms
        if (!algorithms.includes(algorithm)) {
            throw new Error(`Ivalid algorithm.\nValid arguments are: "${algorithms.join(", ")}".`);
        }

        this.algorithm = algorithm;

        this.hash = {};
        this.hash.array = null;
        this.hash.update = this.makeHashArray.bind(this);

        if (input !== null) this.makeHashArray(input);

        return this.hash;
    }

    static getAlgorithms() {
        return ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    }

    async makeHashArray(input) {
        /*
            Digests the given input and stores an array from the hash buffer.
        */
        input = this.testInput(input);

        // hash the input
        const hashBuffer = await window.crypto.subtle.digest(this.algorithm, input);
        
        this.hash.array = new Uint8Array(hashBuffer);
        this.addConverters();
    }

    async addConverters() {
        /*
            Appends methods for getting common representations
            of the hash array to the returned object.
        */
        if (this.hash.hasConverters) return;
                
        if (typeof(BaseEx) === "undefined") {
            throw new Error("Library 'BaseEx' has not yet loaded.\nMake sure that this is the case. (e.g. initializing SHAHashObj via a load EventListener");
        }

        const capitalize = str => str.charAt(0).toUpperCase().concat(str.slice(1));
        
        const baseEx = new BaseEx("bytes");
        const converters = Object.keys(baseEx).slice(1); 
        
        this.hash.toHex = () => baseEx.base16.encode(this.hash.array);
        
        for (const converter of converters) {
            this.hash[`to${capitalize(converter)}`] = () => baseEx[converter].encode(this.hash.array);
        }
        this.hash.hasConverters = true;
    }

    testInput(input) {
        if (typeof(input) === "string") {
            input = new TextEncoder().encode(input);
        } else if (!(input instanceof ArrayBuffer || ArrayBuffer.isView(input))) {
            throw new TypeError("Input must be of type String, ArrayBuffer or ArrayBufferView (typed array)");
        }
        return input;
    }
}

function fileToBytes() {
    const reader = new FileReader();
    reader.onload = function() {
  
        const arrayBuffer = this.result;
        console.log(new Uint8Array(arrayBuffer));
  
    }
    reader.readAsArrayBuffer(this.files[0]);
  
}

export default SHAHashObj;
export {fileToBytes};
