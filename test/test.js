/* eslint-disable no-undef */
import { test } from "no-bro-cote";

test.addImport("import BrowserSHAObj from './dist/BrowserSHAObj.esm.min.js';")

const INPUT = "Hello World!";

test.makeUnit(
    "SHA-1 Output",
    "2ef7bde608ce5404e97d5f042f95f89f1c232871",
    async (input) => {
        const shaObj = await BrowserSHAObj.new("SHA-1", input);
        return shaObj.hexdigest();
    },
    INPUT
);

test.makeUnit(
    "SHA-256 Output",
    "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    async (input) => {
        const shaObj = await BrowserSHAObj.new("SHA-256", input);
        return shaObj.hexdigest();
    },
    INPUT
);

test.makeUnit(
    "SHA-384 Output",
    "bfd76c0ebbd006fee583410547c1887b0292be76d582d96c242d2a792723e3fd6fd061f9d5cfd13b8f961358e6adba4a",
    async (input) => {
        const shaObj = await BrowserSHAObj.new("SHA-384", input);
        return shaObj.hexdigest();
    },
    INPUT
);

test.makeUnit(
    "SHA-512 Output",
    "861844d6704e8573fec34d967e20bcfef3d424cf48be04e6dc08f2bd58c729743371015ead891cc3cf1c9d34b49264b510751b1ff9e537937bc46b5d6ff4ecc8",
    async (input) => {
        const shaObj = await BrowserSHAObj.new("SHA-512", input);
        return shaObj.hexdigest();
    },
    INPUT
);

test.makeUnit(
    "Concatenation via update method",
    "2ef7bde608ce5404e97d5f042f95f89f1c232871",
    async () => {
        const shaObj = await BrowserSHAObj.new("SHA-1", "Hello");
        await shaObj.update(" World!")
        return shaObj.hexdigest();
    }
);

test.makeUnit(
    "Copying an instance",
    "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    async (input) => {
        const shaObj = await BrowserSHAObj.new("SHA-256", input);
        const clone = await shaObj.copy();
        return clone.hexdigest();
    },
    INPUT
);


test.makeUnit(
    "Base32 (RFC4648) representation",
    "fu1r2pbvu7u57e9do60kh8embnu2qiovkfb7ea2arn9004jdi1kg====",
    async (input) => {
        const shaObj = await BrowserSHAObj.new("SHA-256", input);
        return shaObj.basedigest.toBase32_rfc4648();
    },
    INPUT
);

test.makeUnit(
    "SimpleBase36 representation",
    "qcgdk901kmt98k7fll33t5irv2tqqgkh0e15msl7v7hftir30rv",
    async (input) => {
        const shaObj = await BrowserSHAObj.new("SHA-256", input);
        return shaObj.basedigest.toSimpleBase.Base32();
    },
    INPUT
);


test.makeUnit(
    "Bytes representation",
    "127,131,177,101,127,241,252,83,185,45,193,129,72,161,214,93,252,45,75,31,163,214,119,40,74,221,210,0,18,109,144,105",
    async (input) => {
        const shaObj = await BrowserSHAObj.new("SHA-256", input);
        return shaObj.basedigest.toBytes().toString();
    },
    INPUT
);

test.init();
