/*
 * [BrowserSHAObj]{@link https://github.com/UmamiAppearance/BrowserSHAObj}
 *
 * @version 0.1.3
 * @author UmamiAppearance [mail@umamiappearance.eu]
 * @license GPL-3.0
 */
 
class SHAObj {
    /*
        Creates a SHA-(1-512) object, that holds an array
        of the output for the given algorithm. Multiple
        representations of the input-digest are available.
        
        Two arguments are taken by the constructor.
            * algorithm
            * input
        
        The input is set to "null" by default. If it is not
        overwritten, the created object does not hold the processed
        array of the input. This has the advantage, that any new
        input can be called asynchronously and awaited for.

        The algorithm is set to SHA-256 by default.
    */

    constructor(algorithm="SHA-256", input=null) {
        
        const algorithms = this.constructor.getAlgorithms();

        // Simplify the input for the user - sha1, Sha-256... 
        // everything is fine, even the bit value by itself
        // (like 384), as long as the numbers match to the
        // provided algorithms.
        algorithm = `SHA-${String(algorithm).match(/[0-9]+/)[0]}`;
        if (!algorithms.includes(algorithm)) {
            throw new Error(`Invalid algorithm.\nValid arguments are: "${algorithms.join(", ")}".`);
        }

        this.algorithm = algorithm;

        this.hash = {};
        this.hash.array = null;
        this.hash.update = this.makeHashArray.bind(this);

        if (input !== null) this.makeHashArray(input);

        return this.hash;
    }

    static getAlgorithms() {
        /*
            return available algorithms
        */
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
        
        return true;
    }

    async addConverters() {
        /*
            Appends BaseEx encoders to the returned object for the ability
            to covert the byte array of a hash to many representations.
        */
        if (this.hash.hasConverters) return;

        const capitalize = str => str.charAt(0).toUpperCase().concat(str.slice(1));

        this.hash.toHex = () => this.baseEx.base16.encode(this.hash.array);
        const converters = Object.keys(this.baseEx).slice(1);
        for (const converter of converters) {
            this.hash[`to${capitalize(converter)}`] = () => this.baseEx[converter].encode(this.hash.array);
        }
        
        this.hash.hasConverters = true;
    }

    testInput(input) {
        /*
            Converts strings to bytes, rejects anything
            else but ArrayBuffer and typed Array.
        */
        if (typeof(input) === "string") {
            input = new TextEncoder().encode(input);
        } else if (!(input instanceof ArrayBuffer || ArrayBuffer.isView(input))) {
            throw new TypeError("Input must be of type String, ArrayBuffer or ArrayBufferView (typed array)");
        }
        return input;
    }
}

export default SHAObj;
