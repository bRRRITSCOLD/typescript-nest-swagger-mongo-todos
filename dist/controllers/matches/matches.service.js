"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const hltv_1 = require("../../lib/hltv");
const logger_1 = require("../../lib/logger");
const utils_1 = require("../../lib/utils");
const errors_1 = require("../../models/errors");
let MatchesService = class MatchesService {
    constructor() {
        this.matches = [];
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`{}MatchesService::#getAll::initiating execution`);
                const matches = yield hltv_1.default.getMatches();
                if (!matches.length) {
                    const e = new Error('no matches found');
                    e.statusCode = 404;
                    throw e;
                }
                logger_1.default.info(`{}MatchesService::#getAll::successfully executed`);
                return matches;
            }
            catch (err) {
                const error = errors_1.APIError(err);
                logger_1.default.error(`{}MatchesService::#getAll::error executing::error=${utils_1.default.common.stringify(error)}`);
                throw error;
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`{}MatchesService::#getOne::initiating execution`);
                const match = yield hltv_1.default.getMatch(id);
                logger_1.default.info(`{}MatchesService::#getOne::successfully executed`);
                return match;
            }
            catch (err) {
                const error = errors_1.APIError(err);
                if (`err.title === Cannot read property 'split' of undefined`) {
                    error.title = 'no match found';
                    error.statusCode = 404;
                }
                logger_1.default.error(`{}MatchesService::#getOne::error executing::error=${utils_1.default.common.stringify(error)}`);
                throw error;
            }
        });
    }
};
MatchesService = __decorate([
    common_1.Injectable()
], MatchesService);
exports.MatchesService = MatchesService;
//# sourceMappingURL=matches.service.js.map