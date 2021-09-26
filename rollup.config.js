import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.js",
    output: [ 
        {   
            format: "iife",
            name: "BrowserSHAObj",
            file: "dist/BrowserSHAObj.js"
        },
        {   
            format: "iife",
            name: "BrowserSHAObj",
            file: "dist/BrowserSHAObj.min.js",
            plugins: [terser()]
        },
        {   
            format: "es",
            name: "BrowserSHAObj",
            file: "dist/BrowserSHAObj.esm.js"
        },
        {   
            format: "es",
            name: "BrowserSHAObj",
            file: "dist/BrowserSHAObj.esm.min.js",
            plugins: [terser()]
        },
    ],
    plugins: [nodeResolve()]
};
