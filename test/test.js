import BrowserSHAObj from "../src/BrowserSHAObj.js";

window.tests = {
    count: 0,
    errors: 0,
    errorMessages: new Object()
}

const testInput = [
    "Hello World!",
    new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
];

const expectedOutputs = {
    "SHA-1":   "2ef7bde608ce5404e97d5f042f95f89f1c232871",
    "SHA-256": "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    "SHA-384": "bfd76c0ebbd006fee583410547c1887b0292be76d582d96c242d2a792723e3fd6fd061f9d5cfd13b8f961358e6adba4a+",
    "SHA-512": "861844d6704e8573fec34d967e20bcfef3d424cf48be04e6dc08f2bd58c729743371015ead891cc3cf1c9d34b49264b510751b1ff9e537937bc46b5d6ff4ecc8"
}

function makeError(input, output, expected) {
    return {
        input: input,
        output: output,
        expected: expected
    }
}

async function makeTests() {
    const results = {
        count: 0,
        errors: 0,
        errorMessages: new Object()
    }
    
    for (const algorithm of Object.keys(expectedOutputs)) {
        const hashFN = new BrowserSHAObj(algorithm);
        testInput.forEach(async input => {
            results.count++
            await hashFN.update(input);
            const hexDigest = hashFN.toHex();
            console.log(expectedOutputs[algorithm]);
            if (hexDigest !== expectedOutputs[algorithm]) {
                console.log("error");
                results.errors++;
                if (!results.errorMessages[algorithm]) results.errorMessages[algorithm] = new Object();
                results.errorMessages[algorithm].hexTest = makeError(input, hexDigest, expectedOutputs[algorithm]);
            }
        });
    }
    return results;
}

export default makeTests;
