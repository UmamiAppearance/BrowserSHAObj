import terser from "@rollup/plugin-terser";

const selectiveTerser = terser({
    output: {
        comments: (node, comment) => {
            const text = comment.value;
            const type = comment.type;
            if (type === "comment2") {
                return !(/BaseEx\|\w+/).test(text) && (/@license/i).test(text);
            }
        }
    },
});


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
            plugins: [selectiveTerser]
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
            plugins: [selectiveTerser]
        },
    ]
};
