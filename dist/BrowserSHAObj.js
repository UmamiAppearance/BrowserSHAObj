var BrowserSHAObj = (function () {
    'use strict';

    /*
     * [BaseEx]{@link https://github.com/UmamiAppearance/BaseExJS}
     *
     * @version 0.1.0
     * @author UmamiAppearance [mail@umamiappearance.eu]
     * @license GPL-3.0 AND BSD-3-Clause (Base91, Copyright (c) 2000-2006 Joachim Henke)
     */
    class Base16{constructor(version="default",input="str",output="str"){this.charsets={default:"0123456789abcdef"},this.IOtypes=["str","bytes"],this.utils=new BaseExUtils(this),[this.version,this.defaultInput,this.defaultOutput]=this.utils.validateArgs([version,input,output]),this.converter=new BaseExConv(16,1,2),this.converter.padAmount=[0];}encode(input,...args){args=this.utils.validateArgs(args);const inputType=this.utils.setIOType(args,"in"),version=this.utils.getVersion(args);input=this.utils.validateInput(input,inputType);const inputBytes="str"===inputType?(new TextEncoder).encode(input):input;let output;return output=this.converter.encode(inputBytes,this.charsets[version])[0],output}decode(input,...args){args=this.utils.validateArgs(args);const version=this.utils.getVersion(args),outputType=this.utils.setIOType(args,"out");input=String(input).replace(/^0x/,""),Boolean(input.length%2)&&(input="0".concat(input));const output=this.converter.decode(input,this.charsets[version]);return "bytes"===outputType?output:(new TextDecoder).decode(output)}}class Base32{constructor(version="rfc4648",input="str",output="str",padding=!0){this.charsets={rfc3548:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",rfc4648:"0123456789ABCDEFGHIJKLMNOPQRSTUV"},this.padding=Boolean(padding),this.IOtypes=["str","bytes"],this.utils=new BaseExUtils(this),[this.version,this.defaultInput,this.defaultOutput]=this.utils.validateArgs([version,input,output]),this.converter=new BaseExConv(32,5,8),this.converter.padAmount=[0,1,3,4,6];}encode(input,...args){args=this.utils.validateArgs(args);const inputType=this.utils.setIOType(args,"in"),version=this.utils.getVersion(args);input=this.utils.validateInput(input,inputType);const inputBytes="str"===inputType?(new TextEncoder).encode(input):input;let output,zeroPadding;if([output,zeroPadding]=this.converter.encode(inputBytes,this.charsets[version]),zeroPadding){const padValue=this.converter.padAmount[zeroPadding];output=output.slice(0,output.length-padValue),this.padding&&(output=output.concat("=".repeat(padValue)));}return output}decode(input,...args){args=this.utils.validateArgs(args);const version=this.utils.getVersion(args),outputType=this.utils.setIOType(args,"out"),missingChars=input.length%8;Boolean(missingChars)&&(input=input.padEnd(input.length+8-missingChars,"="));const output=this.converter.decode(input,this.charsets[version]);return "bytes"===outputType?output:(new TextDecoder).decode(output)}}class Base64{constructor(version="default",input="str",output="str",padding=!0){const b62Chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";this.charsets={default:b62Chars.concat("+/"),urlsafe:b62Chars.concat("-_")},this.padding=Boolean(padding),this.IOtypes=["str","bytes"],this.utils=new BaseExUtils(this),[this.version,this.defaultInput,this.defaultOutput]=this.utils.validateArgs([version,input,output]),this.converter=new BaseExConv(64,3,4),this.converter.padAmount=[0,1,2];}encode(input,...args){args=this.utils.validateArgs(args);const inputType=this.utils.setIOType(args,"in"),version=this.utils.getVersion(args);input=this.utils.validateInput(input,inputType);const inputBytes="str"===inputType?(new TextEncoder).encode(input):input;let output,zeroPadding;if([output,zeroPadding]=this.converter.encode(inputBytes,this.charsets[version]),zeroPadding){const padValue=this.converter.padAmount[zeroPadding];output=output.slice(0,output.length-padValue),this.padding&&(output=output.concat("=".repeat(padValue)));}return output}decode(input,...args){args=this.utils.validateArgs(args);const version=this.utils.getVersion(args),outputType=this.utils.setIOType(args,"out"),missingChars=input.length%4;Boolean(missingChars)&&(input=input.padEnd(input.length+4-missingChars,"="));const output=this.converter.decode(input,this.charsets[version]);return "bytes"===outputType?output:(new TextDecoder).decode(output)}}class Base85{constructor(version="ascii85",input="str",output="str",debug=!1){const asciiChars="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstu";this.charsets={ascii85:asciiChars,adobe:asciiChars,rfc1924:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~",z85:"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#"},this.IOtypes=["str","bytes"],this.utils=new BaseExUtils(this),this.expandUtils(debug),[this.version,this.defaultInput,this.defaultOutput]=this.utils.validateArgs([version,input,output]),this.converter=new BaseExConv(85,4,5),this.converter.padAmount=[0];}encode(input,...args){args=this.utils.validateArgs(args);const inputType=this.utils.setIOType(args,"in"),version=this.utils.getVersion(args);input=this.utils.validateInput(input,inputType);const inputBytes="str"===inputType?(new TextEncoder).encode(input):input;let replacer=null,output,zeroPadding;return Boolean(version.match(/adobe|ascii85/))&&(replacer=(frame,zPad)=>Boolean(zPad)||"!!!!!"!==frame?frame:"z"),[output,zeroPadding]=this.converter.encode(inputBytes,this.charsets[version],replacer),output=output.slice(0,output.length-zeroPadding),"adobe"===version&&(output=`<~${output}~>`),"rfc1924"===version&&this.utils.announce(),output}decode(input,...args){args=this.utils.validateArgs(args);const version=this.utils.getVersion(args),outputType=this.utils.setIOType(args,"out");input=input.replace(/\s/g,""),Boolean(version.match(/adobe|ascii85/))&&(input=input.replace(/z/g,"!!!!!"),"adobe"===version&&(input=input.replace(/^<~|~>$/g,"")));const output=this.converter.decode(input,this.charsets[version]);return "bytes"===outputType?output:(new TextDecoder).decode(output)}expandUtils(debug){this.utils.announce=()=>{if(!debug){const date=new Date;if(3===date.getMonth()&&1===date.getDate())console.log("         __\n _(\\    |@@|\n(__/\\__ \\--/ __\n   \\___|----|  |   __\n       \\ }{ /\\ )_ / _\\\n       /\\__/\\ \\__O (__\n      (--/--)    \\__/\n      _)(  )(_\n     `---''---`");else {const ts=date.getTime();date.setMonth(3,1),date.setHours(0,0,0),date.getTime()<ts&&date.setFullYear(date.getFullYear()+1);const dist=date-ts,d=Math.floor(dist/864e5),H=Math.floor(dist%864e5/36e5),M=Math.floor(dist%36e5/6e4),msg=`Time left: ${d} days, ${H} hours, ${M} minutes`;this.utils.warning("Only the charset is used. The input is not taken as a 128 bit integer. (because this is madness)"),this.utils.warning(msg);}}};}}class Base91{constructor(version="default",input="str",output="str"){this.charsets={default:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"'},this.IOtypes=["str","bytes"],this.utils=new BaseExUtils(this),this.utils.binPow={13:8192,14:16384},this.utils.divmod=(x,y)=>[Math.floor(x/y),x%y],[this.version,this.defaultInput,this.defaultOutput]=this.utils.validateArgs([version,input,output]);}encode(input,...args){args=this.utils.validateArgs(args);const inputType=this.utils.setIOType(args,"in"),version=this.utils.getVersion(args);input=this.utils.validateInput(input,inputType);const inputBytes="str"===inputType?(new TextEncoder).encode(input):input;let bitCount=0,n=0,output="";const chars=this.charsets[version];if(inputBytes.forEach(byte=>{if(n+=byte<<bitCount,bitCount+=8,bitCount>13){let count=13,rN=n%this.utils.binPow[13],q,r;rN<89&&(count=14,rN=n%this.utils.binPow[14]),n>>=count,bitCount-=count,[q,r]=this.utils.divmod(rN,91),output=`${output}${chars[r]}${chars[q]}`;}}),Boolean(bitCount)){let q,r;[q,r]=this.utils.divmod(n,91),output=output.concat(chars[r]),(bitCount>7||n>90)&&(output=output.concat(chars[q]));}return output}decode(input,...args){args=this.utils.validateArgs(args);const version=this.utils.getVersion(args),outputType=this.utils.setIOType(args,"out");let l=(input=input.replace(/\s/g,"")).length,odd=!1;Boolean(l%2)&&(odd=!0,l--);let n=0,bitCount=0;const chars=this.charsets[version],b256Array=new Array;for(let i=0;i<l;i+=2){const rN=chars.indexOf(input[i])+91*chars.indexOf(input[i+1]);n=(rN<<bitCount)+n,bitCount+=rN%this.utils.binPow[13]>88?13:14;do{b256Array.push(n%256),n>>=8,bitCount-=8;}while(bitCount>7)}if(odd){const lastChar=input.charAt(l),rN=chars.indexOf(lastChar);b256Array.push(((rN<<bitCount)+n)%256);}const output=Uint8Array.from(b256Array);return "bytes"===outputType?output:(new TextDecoder).decode(output)}}class BaseExConv{constructor(radix,bsEnc,bsDec){this.radix=radix,this.bsEnc=bsEnc,this.bsDec=bsDec;}encode(inputBytes,charset,replacer=null){let output="",zeroPadding=0;const bs=this.bsEnc;if(bs>6)throw new RangeError("The given blocksize may require big integers (> 2^53) during conversion.\nThis is not supported.");for(let i=0,l=inputBytes.length;i<l;i+=bs){let subArray=inputBytes.slice(i,i+bs);if(subArray.length<bs){zeroPadding=bs-subArray.length;const paddedArray=new Uint8Array(bs);paddedArray.set(subArray),subArray=paddedArray;}let n=0;subArray.forEach((b,j)=>n+=b*this.pow(256,bs-1-j));const bXarray=new Array;let q=n,r;for(;q>=this.radix;)[q,r]=this.divmod(q,this.radix),bXarray.unshift(r);for(bXarray.unshift(q);bXarray.length<this.bsDec;)bXarray.unshift(0);let frame="";bXarray.forEach(charIndex=>frame=frame.concat(charset[charIndex])),Boolean(replacer)&&(frame=replacer(frame,zeroPadding)),output=output.concat(frame);}return [output,zeroPadding]}decode(inputBaseStr,charset){const bs=this.bsDec;let padChars=0;const inputBytes=Uint8Array.from(inputBaseStr.split("").map(c=>{const index=charset.indexOf(c);return index<0?(padChars++,0):index}));let padding=this.padAmount.indexOf(padChars),b256Array=new Array;for(let i=0,l=inputBaseStr.length;i<l;i+=bs){let subArray=inputBytes.slice(i,i+bs);if(subArray.length<bs){padding=bs-subArray.length;const paddedArray=Uint8Array.from(Array(bs).fill(this.radix-1));paddedArray.set(subArray),subArray=paddedArray;}const subArray256=new Array;let n=0;subArray.forEach((b,j)=>n+=b*this.pow(this.radix,bs-1-j));let q=n,r;for(;q>=256;)[q,r]=this.divmod(q,256),subArray256.unshift(r);for(subArray256.unshift(q);subArray256.length<this.bsEnc;)subArray256.unshift(0);b256Array=b256Array.concat(subArray256);}const output=Uint8Array.from(b256Array.slice(0,b256Array.length-padding));return output}divmod(x,y){return [Math.floor(x/y),x%y]}pow(radix,n){const powList={16:[1,16],32:[1,32,1024,32768,32**4,32**5,32**6,32**7],64:[1,64,4096,64**3],85:[1,85,7225,85**3,85**4],256:[1,256,65536,256**3,256**4]};return powList[radix][n]}}class BaseExUtils{constructor(main){this.root=main,"charsets"in main&&this.charsetUserToolsConstructor();}charsetUserToolsConstructor(){this.root.addCharset=(name,charset)=>{if("string"!=typeof name)throw new TypeError("The charset name must be a string.");const setLen=parseInt(this.root.constructor.name.replace(/[^0-9]/g,""),10);let inputLen=setLen;if("string"==typeof charset||Array.isArray(charset))inputLen=charset.length,charset=new Set(charset);else if("set"!=typeof charset)throw new TypeError("The charset must be one of the types:\n'str', 'set', 'array'.");if(charset.size!==setLen)throw inputLen===setLen?new Error("There were repetitive chars found in your charset. Make sure each char is unique."):new Error(`The the length of the charset must be ${setLen}.`);charset=[...charset].join(""),this.root.charsets[name]=charset,console.log(`New charset added with the name '${name}' added and ready to use`);},this.root.setDefaultVersion=version=>[this.root.version]=this.validateArgs([version]);}makeArgList(args){return args.map(s=>`'${s}'`).join(", ")}setIOType(args,IO){let type;return type=args.includes("bytes")?"bytes":args.includes("str")?"str":"in"===IO?this.root.defaultInput:this.root.defaultOutput,type}getVersion(args){let version=this.root.version;return args.forEach(arg=>{arg in this.root.charsets&&(version=arg);}),version}validateArgs(args){let versions=null,validArgs;const loweredArgs=new Array;return "charsets"in this.root?(versions=Object.keys(this.root.charsets),validArgs=[...this.root.IOtypes,...versions]):validArgs=this.root.IOtypes,Boolean(args.length)&&args.forEach(arg=>{if(arg=String(arg).toLowerCase(),!validArgs.includes(arg)){const versionHint=versions?`The options for version (charset) are:\n${this.makeArgList(versions)}\n\n`:"";throw new TypeError(`'${arg}'\n\nValid arguments for in- and output-type are:\n${this.makeArgList(this.root.IOtypes)}\n\n${versionHint}Traceback:`)}loweredArgs.push(arg);}),loweredArgs}validateInput(input,inputType){if("str"===inputType)return "string"!=typeof input&&this.warning("Your input was converted into a string."),String(input);if("string"==typeof input)throw new TypeError("Your provided input is a string, but some kind of (typed) Array is expected.");if("object"!=typeof input)throw new TypeError("Input must be some kind of (typed) Array if input type is set to 'bytes'.");return input}warning(message){console.hasOwnProperty("warn")?console.warn(message):console.log(`___\n${message}\n`);}}class BaseEx{constructor(input="str",output="str"){this.base16=new Base16("default",input,output),this.base32_rfc3548=new Base32("rfc3548",input,output),this.base32_rfc4648=new Base32("rfc4648",input,output),this.base64=new Base64("default",input,output),this.base64_urlsafe=new Base64("urlsafe",input,output),this.base85adobe=new Base85("adobe",input,output),this.base85ascii=new Base85("ascii85",input,output),this.base85_z85=new Base85("z85",input,output),this.base91=new Base91("default",input,output);}}

    /*
     * [BrowserSHAObj]{@link https://github.com/UmamiAppearance/BrowserSHAObj}
     *
     * @version 0.1.0
     * @author UmamiAppearance [mail@umamiappearance.eu]
     * @license GPL-3.0
     */
     
    class BrowserSHAObj {
        /*
            Creates a SHA-(1-512) object, that holds an array
            of the output for the given algorithm. Multiple
            representations of the input-digest are available.
            
            Two arguments are taken by the constructor.
                * algorithm
                * input
            
            The input is set to "null" by default. If it is not
            overwritten the created object does not hold the processed
            array of the input. This has the advantage, that any new
            input can be called asynchronously and awaited for.

            The algorithm is set to SHA-256 by default.

            Also by default all input is converted into a Uint8Array.
            This can be disabled (by setting "utf8Input" to false).
            In this case other ArrayBuffers can be used as input.
        */

        constructor(algorithm="SHA-256", input=null) {
            
            const algorithms = this.constructor.getAlgorithms();

            // Simplify the input for the user - sha1, Sha-256... 
            // everything is fine, even the bit value by itself
            // (like 384), as long as the numbers match to the
            // provided algorithms.
            algorithm = `SHA-${String(algorithm).match(/[0-9]+/)[0]}`;
            if (!algorithms.includes(algorithm)) {
                throw new Error(`Invalid algorithm.\nValid arguments are: "${algorithms.join(", ")}".`);
            }

            this.algorithm = algorithm;

            this.hash = {};
            this.hash.array = null;
            this.hash.update = this.makeHashArray.bind(this);

            if (input !== null) this.makeHashArray(input);

            return this.hash;
        }

        static getAlgorithms() {
            /*
                return available algorithms
            */
            return ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
        }

        async makeHashArray(input) {
            /*
                Digests the given input and stores an array from the hash buffer.
            */
            input = this.testInput(input);

            // hash the input
            const hashBuffer = await window.crypto.subtle.digest(this.algorithm, input);
            
            this.hash.array = new Uint8Array(hashBuffer);
            this.addConverters();
            
            return true;
        }

        async addConverters() {
            /*
                Appends methods for getting common representations
                of the hash array to the returned object.
            */
            if (this.hash.hasConverters) return;
                    
            if (!("BaseEx" in this)) {
                throw new Error("Library 'BaseEx' is not present.");
            }

            const capitalize = str => str.charAt(0).toUpperCase().concat(str.slice(1));
            
            const baseEx = new this.BaseEx("bytes");
            const converters = Object.keys(baseEx).slice(1); 
            
            this.hash.toHex = () => baseEx.base16.encode(this.hash.array);
            
            for (const converter of converters) {
                this.hash[`to${capitalize(converter)}`] = () => baseEx[converter].encode(this.hash.array);
            }
            this.hash.hasConverters = true;
        }

        testInput(input) {
            /*
                Converts strings to bytes, rejects anything
                else but ArrayBuffer and typed Array.
            */
            if (typeof(input) === "string") {
                input = new TextEncoder().encode(input);
            } else if (!(input instanceof ArrayBuffer || ArrayBuffer.isView(input))) {
                throw new TypeError("Input must be of type String, ArrayBuffer or ArrayBufferView (typed array)");
            }
            return input;
        }
    }

    /*
     * [BrowserSHAObj]{@link https://github.com/UmamiAppearance/BrowserSHAObj}
     * esm-module for npm
     */

    BrowserSHAObj.prototype.BaseEx = BaseEx;

    return BrowserSHAObj;

})();
