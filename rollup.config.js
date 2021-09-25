import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
    input: "src/index.js",
    output: [ 
        {   
            format: "iife",
            name: "BrowserSHAObj",
            file: "dist/BrowserSHAObj.js"
        },
        {   
            format: "es",
            name: "BrowserSHAObj",
            file: "dist/BrowserSHAObj.esm.js"
        },
    ],
    plugins: [nodeResolve()]
};
