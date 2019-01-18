"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hltv_1 = require("hltv");
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const errors_1 = require("../../../models/errors");
class Hltv {
    constructor() { }
    getMatches() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.debug(`{}Hltv::#getMatches::initiating execution`);
                const matches = yield hltv_1.default.getMatches();
                logger_1.default.info(`{}Hltv::#getMatches::successfully executed`);
                return matches;
            }
            catch (err) {
                const error = errors_1.APIError(err);
                logger_1.default.error(`{}Hltv::#getMatches::error executing::error=${utils_1.default.common.stringify(error)}`);
                throw error;
            }
        });
    }
    getMatch(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.debug(`{}Hltv::#getMatch::initiating execution`);
                const match = yield hltv_1.default.getMatch({ id });
                logger_1.default.info(`{}Hltv::#getMatch::successfully executed`);
                return match;
            }
            catch (err) {
                const error = errors_1.APIError(err);
                logger_1.default.error(`{}Hltv::#getMatch::error executing::error=${utils_1.default.common.stringify(error)}`);
                throw error;
            }
        });
    }
}
exports.default = Hltv;
//# sourceMappingURL=hltv.js.map