"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const logger_1 = require("../../lib/logger");
const utils_1 = require("../../lib/utils");
const errors_1 = require("../../models/errors");
const matches_service_1 = require("./matches.service");
let MatchesController = class MatchesController {
    constructor(matchesService) {
        this.matchesService = matchesService;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.debug('{}MatchesController::#getAll::initiating execution');
                const matches = yield this.matchesService.getAll();
                logger_1.default.info('{}MatchesController::#getAll::successfully executed');
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send(utils_1.default.common.stringify(matches));
            }
            catch (err) {
                const error = errors_1.APIError(err);
                logger_1.default.error(`{}MatchesController::#getAll::error executing::error=${utils_1.default.common.stringify(error)}`);
                res.setHeader('Content-Type', 'application/json');
                return res.status(error.statusCode).send(utils_1.default.common.stringify(error));
            }
        });
    }
    getOne(req, res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.debug('{}MatchesController::#getOne::initiating execution');
                const matches = yield this.matchesService.getOne(+id);
                logger_1.default.info('{}MatchesController::#getOne::successfully executed');
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send(utils_1.default.common.stringify(matches));
            }
            catch (err) {
                const error = errors_1.APIError(err);
                logger_1.default.error(`{}MatchesController::#getOne::error executing::error=${utils_1.default.common.stringify(error)}`);
                res.setHeader('Content-Type', 'application/json');
                return res.status(error.statusCode).send(utils_1.default.common.stringify(error));
            }
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Request()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "getAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "getOne", null);
MatchesController = __decorate([
    common_1.Controller('matches'),
    __metadata("design:paramtypes", [matches_service_1.MatchesService])
], MatchesController);
exports.MatchesController = MatchesController;
//# sourceMappingURL=matches.controller.js.map