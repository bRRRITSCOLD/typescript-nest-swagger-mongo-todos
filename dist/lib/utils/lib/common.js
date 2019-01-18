"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringify = require("json-stringify-safe");
const _stringify = (thing, native = false) => {
    try {
        if (native)
            return JSON.stringify(thing);
        return stringify(thing);
    }
    catch (err) {
        throw err;
    }
};
class Common {
    constructor() {
        this.stringify = _stringify;
    }
}
exports.default = Common;
//# sourceMappingURL=common.js.map