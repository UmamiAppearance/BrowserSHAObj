/*
 * [BrowserSHAObj]{@link https://github.com/UmamiAppearance/BrowserSHAObj}
 *
 * @version 0.2.0
 * @author UmamiAppearance [mail@umamiappearance.eu]
 * @license GPL-3.0
 */

import { BaseEx } from "../../node_modules/base-ex/src/base-ex.js";

if (!BaseEx) {
    throw new Error("BaseEx needs to be accessible.");
}

const baseEx = new BaseEx();
 
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

    #algorithm = null;
    #bits = null;
    #input = [];

    constructor(algorithm="SHA-256") {
        
        const algorithms = this.constructor.algorithmsAvailable();

        // Simplify the input for the user - sha1, Sha-256... 
        // everything is fine, even the bit value by itself
        // (like 384), as long as the numbers match to the
        // provided algorithms.
        this.#bits = String(algorithm).match(/[0-9]+/)[0]|0;
        this.blockSize = this.#bits > 256 ? 128 : 64;
        this.#algorithm = `SHA-${this.#bits}`;

        if (this.#bits === 1) {
            this.#bits = 160;
        }

        if (!algorithms.has(this.#algorithm)) {
            throw new TypeError(`Available algorithms are: '${Array.from(algorithms).join(", ")}'.`);
        }

        this.digest = null;
        this.#addConverters();
    }

    static algorithmsAvailable() {
        return new Set(["SHA-1", "SHA-256", "SHA-384", "SHA-512"]);
    }

    static algorithmsGuaranteed() {
        return this.constructor.algorithmsAvailable();
    }

    static async new(algorithm="SHA-256", input=null) {
        const shaObj = new SHAObj(algorithm);
        if (input !== null) {
            await shaObj.update(input);
        }
        return shaObj;
    }

    get digestSize() {
        return this.#bits / 8;
    }

    get name() {
        return this.#algorithm;
    }

    async update(input, replace=false) {
        input = baseEx.byteConverter.encode(input);
        
        if (replace) {
            this.#input = Array.from(input);
        } else {
            this.#input.push(...input);
        }
        
        
        // hash the input
        this.digest = await window.crypto.subtle.digest(this.#algorithm, Uint8Array.from(this.#input));
        
        return true;
    }

    async replace(input) {
        return this.update(input, true);
    }

    /**
     * Appends BaseEx encoders to the returned object for the ability
     * to covert the byte array of a hash to many representations.
     */
    #addConverters() {
        const detach = (arr, str) => arr.splice(arr.indexOf(str), 1);

        const capitalize = str => str.charAt(0).toUpperCase().concat(str.slice(1));

        this.hexdigest = () => baseEx.base16.encode(this.digest);
        const converters = Object.keys(baseEx);
        
        this.basedigest = {
            toSimpleBase: {}
        };

        detach(converters, "base1");
        detach(converters, "byteConverter");
        detach(converters, "simpleBase");

        for (const converter of converters) {
            this.basedigest[`to${capitalize(converter)}`] = () => this.digest 
                ? baseEx[converter].encode(this.digest)
                : null;
        }

        for (const converter in baseEx.simpleBase) {
            this.basedigest.toSimpleBase[capitalize(converter)] = () => this.digest
                ? baseEx.simpleBase[converter].encode(this.digest)
                : null;
        }

        this.basedigest.toBytes = () => this.digest
            ? baseEx.byteConverter.encode(this.digest)
            : null;
    }
}

export default SHAObj;
