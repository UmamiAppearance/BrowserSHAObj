import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.js",
    output: [ 
        {   
            format: "iife",
            name: "SHAObj",
            file: "dist/BrowserSHAObj.iife.js"
        },
        {   
            format: "iife",
            name: "SHAObj",
            file: "dist/BrowserSHAObj.iife.min.js",
            plugins: [terser()]
        },
        {   
            format: "es",
            name: "SHAObj",
            file: "dist/BrowserSHAObj.esm.js"
        },
        {   
            format: "es",
            name: "SHAObj",
            file: "dist/BrowserSHAObj.esm.min.js",
            plugins: [terser()]
        },
    ],
    plugins: [nodeResolve()]
};
