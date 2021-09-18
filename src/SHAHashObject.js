// esm-moldule import (disabled for default js)
//import {Base16, Base32, Base64, Base85, Base91} from "../lib/BaseEx.esm.min.js"

// loading classic script tag if not present
function importBaseEx() {
    function appendToHead() {
        console.log("classic");
        const script = document.createElement("script");
        script.src = "lib/BaseEx.min.js";
        document.querySelector("head").appendChild(script);
    }
    if (typeof Base16 === "undefined") {
        window.Base16 = null;
        window.Base32 = null;
        window.Base64 = null;
        window.Base85 = null;
        window.Base91 = null;
        appendToHead();
    }
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

        this.hashArray = {};
        this.hashArray.array = null;
        this.hashArray.update = this.makeHashArray.bind(this);

        this.addConverters();

        if (message !== null) this.makeHashArray(message);

        return this.hashArray;
    }

    async makeHashArray(message) {
        /*
            Digests the given message and stores an array from the hash buffer.
        */
        const msgArray = (this.utf8Input) ? new TextEncoder().encode(message) : message;        // encode as (utf-8) Uint8Array (if not disabled)
        const hashBuffer = await window.crypto.subtle.digest(this.algorithm, msgArray);         // hash the message
        this.hashArray.array = Array.from(new Uint8Array(hashBuffer));                          // convert buffer to byte array
    }

    async addConverters() {
        /*
            Appends methods for getting common representations
            of the hash array to the returned object.
        */

        await importBaseEx();
        console.log(Base16);
        /*
        this.hashArray.toBase = (radix) => this.mapArray(radix);
        this.hashArray.toBin = () => this.mapArray(2);
        this.hashArray.toOct = () => this.mapArray(8);
        this.hashArray.toDec = () => this.mapArray(10);
        this.hashArray.toHex = () => this.mapArray(16);
        this.hashArray.toBase32 = () => this.mapArray(32).toUpperCase();
        this.hashArray.toBase64 = () => this.mapToBase64();
        this.hashArray.toInt = () => parseInt(this.mapArray(10), 10);
        */
    }
}

// If you like to use this class as a module uncomment the following line
// export default SHAHashObj