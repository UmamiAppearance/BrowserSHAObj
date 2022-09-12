import { importManager } from "rollup-plugin-import-manager";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.js",
    output: [ 
        {   
            format: "iife",
            name: "BrowserSHAObj",
            file: "dist/BrowserSHAObj.iife.js"
        },
        {   
            format: "iife",
            name: "BrowserSHAObj",
            file: "dist/BrowserSHAObj.iife.min.js",
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
    plugins: [
        importManager({
            units: [
                {
                    file: "**/index.js",
                    module: "base-ex",
                    actions: {
                        select: "module",
                        rename: "../node_modules/base-ex/src/base-ex.js"
                    }
                }
            ]
        })
    ]
};
