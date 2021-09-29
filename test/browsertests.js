import { BaseEx } from "../node_modules/base-ex/src/BaseEx.js";
import SHAObj from "../src/main.js";
SHAObj.prototype.baseEx = new BaseEx("bytes");

const makeTests = async () => {

    function makeError(input, output, expected, unit) {
        return {
            input: input,
            output: output,
            expected: expected,
            unit: unit
        }
    }

    const strInput = "Hello World!";
    const testInput = {
        str: strInput,
        typed: new TextEncoder().encode(strInput),
        buffer: new TextEncoder().encode(strInput).buffer
    };

    const expectedOutputs = {
        "SHA-1":   "2ef7bde608ce5404e97d5f042f95f89f1c232871",
        "SHA-256": "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
        "SHA-384": "bfd76c0ebbd006fee583410547c1887b0292be76d582d96c242d2a792723e3fd6fd061f9d5cfd13b8f961358e6adba4a",
        "SHA-512": "861844d6704e8573fec34d967e20bcfef3d424cf48be04e6dc08f2bd58c729743371015ead891cc3cf1c9d34b49264b510751b1ff9e537937bc46b5d6ff4ecc8"
    }

    const results = {
        tests: 0,
        errors: 0,
        errorMessages: new Object()
    }

    let testedRepresentations = false;

    for (const algorithm of Object.keys(expectedOutputs)) {
        const hashFN = new SHAObj(algorithm);
        for (const type in testInput) {
            results.tests++;
            const input = testInput[type];
            // eslint-disable-next-line no-await-in-loop
            await hashFN.update(input);
            const hexDigest = hashFN.toHex();
            const unit = `${algorithm}-${type}`;
            if (hexDigest !== expectedOutputs[algorithm]) {
                results.errors++;
                if (!results.errorMessages[unit]) results.errorMessages[unit] = new Object();
                const inputLog = (type === "buffer") ? `<buffer of str '${testInput.str}'>` : input;
                results.errorMessages[unit].hexTest = makeError(inputLog, hexDigest, expectedOutputs[algorithm], type);
            }

            if (!testedRepresentations) {
                let fnNames = Object.keys(hashFN);
                fnNames = fnNames.filter(key => Boolean(key.match(/^to/)));
                for (const base of fnNames) {
                    results.tests++;
                    try {
                        const repr = hashFN[base]();
                        if (repr.length < 1) {
                            results.errors++;
                            results.errorMessages.repr = `Could not get representation '${base}`;
                        }
                    }
                    catch(e) {
                        results.errors++;
                        results.errorMessages.repr = `${base}, ${e}`;
                    }
                } 

                testedRepresentations = true;
            }
        }
    }

    return results;
}

export default makeTests;