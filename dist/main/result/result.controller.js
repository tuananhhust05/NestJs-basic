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
exports.ResultController = void 0;
const common_1 = require("@nestjs/common");
const role_decorator_1 = require("../../global/decorators/role.decorator");
const user_decorator_1 = require("../../global/decorators/user.decorator");
const user_schema_1 = require("../../user/schemas/user.schema");
const result_service_1 = require("./result.service");
let ResultController = class ResultController {
    constructor(result$) {
        this.result$ = result$;
    }
    async getAllResults(isCount) {
        return await this.result$.getAllResults();
    }
    async getMyResult(user, isCount) {
        return await this.result$.getMyResults(user);
    }
    async getResultByTestId(id) {
        return await this.result$.getResultByTestId(id);
    }
    async getResultById(id) {
        return await this.result$.getResultById(id);
    }
};
__decorate([
    (0, common_1.Get)("all"),
    __param(0, (0, common_1.Query)("isCount")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "getAllResults", null);
__decorate([
    (0, common_1.Get)("my"),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.student),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Query)("isCount")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Boolean]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "getMyResult", null);
__decorate([
    (0, common_1.Get)("test/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "getResultByTestId", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.student),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResultController.prototype, "getResultById", null);
ResultController = __decorate([
    (0, common_1.Controller)("result"),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.admin),
    __metadata("design:paramtypes", [result_service_1.ResultService])
], ResultController);
exports.ResultController = ResultController;
//# sourceMappingURL=result.controller.js.map