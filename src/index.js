/**
 * [BrowserSHAObj]{@link https://github.com/UmamiAppearance/BrowserSHAObj}
 *
 * @version 0.2.6
 * @author UmamiAppearance [mail@umamiappearance.eu]
 * @license GPL-3.0
 */

import { BaseEx } from "../node_modules/base-ex/src/base-ex.js";

const ALGORITHMS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
const BASE_EX = new BaseEx();
 

/**
 * Creates a SHA-(1-512) object for the browser.
 * It is very closely related to pythons hmac library
 * in its methods and features but with many extras.
 * 
 * It provides an easy access to the browsers Crypto.subtle
 * method, and also makes it possible to get multiple
 * different digest methods.
 * 
 * @see: https://docs.python.org/3/library/hashlib.html
 */
export default class BrowserSHAObj {

    #algorithm = null;
    #bits = null;
    #digest = null;
    #input = [];

    /**
     * Creates a SHAObject.
     * @param {string|number} [algorithm="SHA-256"] - The parameter must contain one of the numbers (1/256/384/512), eg: SHA-1, sha256, 384, ... 
     */
    constructor(algorithm="SHA-256") {

        const algorithms = this.constructor.algorithmsAvailable();
        
        this.#bits = [].concat(String(algorithm).match(/[0-9]+/)).at(0)|0;
        this.blockSize = this.#bits > 256 ? 128 : 64;
        this.#algorithm = `SHA-${this.#bits}`;

        // convert sha1 to its actual 160 bits
        this.#bits = Math.min(160, this.#bits);

        if (!algorithms.has(this.#algorithm)) {
            throw new TypeError(`Available algorithms are: '${ALGORITHMS.join(", ")}'.`);
        }

        this.#addConverters();
    }


    /**
     * Static method to receive information about the 
     * available algorithms.
     * @returns {set} - A set of available algorithms.
     */
    static algorithmsAvailable() {
        return new Set(ALGORITHMS);
    }


    /**
     * Added for the sake of completeness in terms
     * of compatibility with pythons hashlib. Here
     * it is pointing to 'algorithmsAvailable'.
     * @returns {set} - A set of available algorithms.
     */
    static algorithmsGuaranteed() {
        return this.constructor.algorithmsAvailable();
    }


    /**
     * Asynchronously creates a new instance.
     * Additionally an input can be provided, which 
     * gets passed to the 'update' method.
     * @param {string|number} algorithm - The parameter must contain one of the numbers (1/256/384/512), eg: SHA-1, sha256, 384, ... 
     * @param {*} input - Input gets converted to bytes and processed by window.crypto.subtle.digest. 
     * @returns {Object} - A SHAObj instance.
     */
    static async new(algorithm="SHA-256", input=null) {
        const shaObj = new this(algorithm);
        if (input !== null) {
            await shaObj.update(input);
        }
        return shaObj;
    }


    /**
     * The size of the resulting hash in bytes.
     */
    get digestSize() {
        return this.#bits / 8;
    }

    
    /**
     * The internal block size of the hash algorithm in bytes.
     */
    get blockSize() {
        return this.#bits > 256 ? 128 : 64;
    }


    /**
     * The canonical name of this hash, always uppercase and
     * always suitable as a parameter to create another hash
     * of this type.
     */
    get name() {
        return this.#algorithm;
    }


    /**
     * Return a copy (“clone”) of the hash object. This can be
     * used to efficiently compute the digests of data sharing
     * a common initial substring.
     * @returns {Object} - SHAObj instance.
     */
    async copy() {
        const input = this.#input.length
            ? Uint8Array.from(this.#input)
            : null;

        return this.constructor.new(this.#algorithm, input);
    }


    /**
     * Update the hash object with almost any input. The input
     * gets converted to a Uint8Array. Unless 'replace' is set
     * to true, repeated calls are equivalent to a single call
     * with the concatenation of all the arguments:
     * shaObj.update(a); shaObj.update(b) is in many occasions
     * equivalent to shaObj.update(a+b).
     * 
     * (Note: Rhe process is a concatenation of bytes. Take as
     * an exception for instance:
     * shaObj.update(1); shaObj.update(2) which is not the same
     * as shaObj.update(1+2))
     * 
     * @param {*} input - Input gets converted to bytes and processed by window.crypto.subtle.digest.
     * @param {*} replace - If true, the input is not concatenated with former input. 
     */
    async update(input, replace=false) {
        
        if (input instanceof ArrayBuffer) {
            input = new Uint8Array(input);
        } else if (ArrayBuffer.isView(input)) {
            input = new Uint8Array(input.buffer);
        } else {
            input = BASE_EX.byteConverter.encode(input, "uint8");
        }

        let finalInput;
        
        // 200 MB process limit for storing
        if (input.byteLength < 200000000) {
            
            if (replace) {
                this.#input = Array.from(input);
            } else {
                this.#input = this.#input.concat(Array.from(input));
            }
        
            finalInput = Uint8Array.from(this.#input);

            // 500+ MB of stored bytes warning
            if (finalInput.byteLength > 500000000 && !this.warned) {
                console.warn("The stored input is getting really big. Dependent from your environment this can lead to memory issues.");
                this.warned = true;
            } 
        } 

        else {
            console.warn("Input gets too big to safely store it in memory. It will get processed directly and neither stored nor concatenated to previous input. If the operation fails, it is due to memory issues.");
            finalInput = input;
        }

        // hash the input
        this.#digest = await window.crypto.subtle.digest(this.#algorithm, finalInput);
    }


    /**
     * Shortcut to 'update(input, true)'.
     * @param {*} input - Input gets converted to bytes and processed by window.crypto.subtle.digest. 
     */
    async replace(input) {
        await this.update(input, true);
    }


    /**
     * Returns the current digest as an ArrayBuffer;
     * @returns {ArrayBuffer}
     */
    digest() {
        return this.#digest;
    }


    /**
     * Appends BaseEx encoders to the returned object for the ability
     * to covert the byte array of a hash to many representations.
     */
    #addConverters() {
        
        const detach = (arr, str) => arr.splice(arr.indexOf(str), 1);
        const capitalize = str => str.charAt(0).toUpperCase().concat(str.slice(1));

        this.hexdigest = () => this.#digest
            ? BASE_EX.base16.encode(this.#digest)
            : null;
        
        const converters = Object.keys(BASE_EX);
        this.basedigest = {
            toSimpleBase: {}
        };

        detach(converters, "base1");
        detach(converters, "byteConverter");
        detach(converters, "simpleBase");

        for (const converter of converters) {
            this.basedigest[`to${capitalize(converter)}`] = () => this.#digest 
                ? BASE_EX[converter].encode(this.#digest)
                : null;
        }

        for (const converter in BASE_EX.simpleBase) {
            this.basedigest.toSimpleBase[capitalize(converter)] = () => this.#digest
                ? BASE_EX.simpleBase[converter].encode(this.#digest)
                : null;
        }

        this.basedigest.toBytes = () => this.#digest
            ? BASE_EX.byteConverter.encode(this.#digest)
            : null;
    }
}
