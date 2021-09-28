/*
 * [BrowserSHAObj]{@link https://github.com/UmamiAppearance/BrowserSHAObj}
 * esm-module with relative import
 */

import {BaseEx} from "../lib/BaseEx/src/BaseEx.js";
import BrowserSHAObj from "./main.js"

BrowserSHAObj.prototype.baseEx = new BaseEx("bytes");

export default BrowserSHAObj

