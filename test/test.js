/* eslint-disable no-undef */
import { test } from "no-bro-cote";

test.addImport("import BrowserSHAObj from './dist/BrowserSHAObj.esm.min.js';")

const INPUT = "Hello World!";

test.makeUnit(
    "Testing SHA-1 Output",
    "2ef7bde608ce5404e97d5f042f95f89f1c232871",
    async (input) => {
        const shaObj = await BrowserSHAObj.new("SHA-1", input);
        return shaObj.hexdigest();
    },
    INPUT
);

test.makeUnit(
    "Testing SHA-256 Output",
    "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    async (input) => {
        const shaObj = await BrowserSHAObj.new("SHA-256", input);
        return shaObj.hexdigest();
    },
    INPUT
);

test.makeUnit(
    "Testing SHA-384 Output",
    "bfd76c0ebbd006fee583410547c1887b0292be76d582d96c242d2a792723e3fd6fd061f9d5cfd13b8f961358e6adba4a",
    async (input) => {
        const shaObj = await BrowserSHAObj.new("SHA-384", input);
        return shaObj.hexdigest();
    },
    INPUT
);

test.makeUnit(
    "Testing SHA-512 Output",
    "861844d6704e8573fec34d967e20bcfef3d424cf48be04e6dc08f2bd58c729743371015ead891cc3cf1c9d34b49264b510751b1ff9e537937bc46b5d6ff4ecc8",
    async (input) => {
        const shaObj = await BrowserSHAObj.new("SHA-512", input);
        return shaObj.hexdigest();
    },
    INPUT
);


test.init();
