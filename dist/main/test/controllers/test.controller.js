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
exports.TestController = void 0;
const common_1 = require("@nestjs/common");
const body_without_decorator_1 = require("../../../global/decorators/body-without.decorator");
const role_decorator_1 = require("../../../global/decorators/role.decorator");
const user_schema_1 = require("../../../user/schemas/user.schema");
const test_service_1 = require("../services/test.service");
let TestController = class TestController {
    constructor(test$) {
        this.test$ = test$;
    }
    async getAllTests(skip, limit, subject, subjectType, isCount) {
        return await this.test$.getAllTests(skip, limit, subject, subjectType, isCount);
    }
    async getAllOpenTests(skip, limit, subject, subjectType, isCount) {
        return await this.test$.getAllOpenTests(skip, limit, subject, subjectType, isCount);
    }
    async getTestById(id) {
        return await this.test$.getTestById(id);
    }
    async createTest(dto) {
        return await this.test$.createTest(dto);
    }
    async editTest(dto) {
        return await this.test$.editTest(dto);
    }
    async changeTestStatus(dto) {
        return await this.test$.changeTestStatus(dto);
    }
    async deleteTest(id) {
        return await this.test$.deleteTest(id);
    }
};
__decorate([
    (0, common_1.Get)("all"),
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("subject")),
    __param(3, (0, common_1.Query)("subjectType")),
    __param(4, (0, common_1.Query)("isCount")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getAllTests", null);
__decorate([
    (0, common_1.Get)("open"),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.student),
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("subject")),
    __param(3, (0, common_1.Query)("subjectType")),
    __param(4, (0, common_1.Query)("isCount")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getAllOpenTests", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.student),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getTestById", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, body_without_decorator_1.BodyWithout)(["_id", "questions"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "createTest", null);
__decorate([
    (0, common_1.Patch)(""),
    __param(0, (0, body_without_decorator_1.BodyWithout)(["status"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "editTest", null);
__decorate([
    (0, common_1.Patch)("status"),
    __param(0, (0, body_without_decorator_1.BodyWithout)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "changeTestStatus", null);
__decorate([
    (0, common_1.Delete)(""),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "deleteTest", null);
TestController = __decorate([
    (0, common_1.Controller)("test"),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.admin),
    __metadata("design:paramtypes", [test_service_1.TestService])
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=test.controller.js.map