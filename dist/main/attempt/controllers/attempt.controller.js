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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptController = void 0;
const common_1 = require("@nestjs/common");
const role_decorator_1 = require("../../../global/decorators/role.decorator");
const user_decorator_1 = require("../../../global/decorators/user.decorator");
const user_schema_1 = require("../../../user/schemas/user.schema");
const attempt_service_1 = require("../services/attempt.service");
let AttemptController = class AttemptController {
    constructor(attempt$) {
        this.attempt$ = attempt$;
    }
    async startAttempt(dto, user) {
        return await this.attempt$.startAttempt(dto, user);
    }
    async updateAttempt(dto, user) {
        return await this.attempt$.updateAttempt(dto, user);
    }
    async submitAttempt(user) {
        return await this.attempt$.submitAttempt(user);
    }
    async getResult(id) {
        return await this.attempt$.getResult(id);
    }
};
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AttemptController.prototype, "startAttempt", null);
__decorate([
    (0, common_1.Patch)(""),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AttemptController.prototype, "updateAttempt", null);
__decorate([
    (0, common_1.Post)("submit"),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AttemptController.prototype, "submitAttempt", null);
__decorate([
    (0, common_1.Get)("result"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttemptController.prototype, "getResult", null);
AttemptController = __decorate([
    (0, common_1.Controller)("attempt"),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.admin, user_schema_1.ARole.student),
    __metadata("design:paramtypes", [attempt_service_1.AttemptService])
], AttemptController);
exports.AttemptController = AttemptController;
//# sourceMappingURL=attempt.controller.js.map