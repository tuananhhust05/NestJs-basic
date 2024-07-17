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
exports.SubjectController = void 0;
const common_1 = require("@nestjs/common");
const body_without_decorator_1 = require("../../global/decorators/body-without.decorator");
const role_decorator_1 = require("../../global/decorators/role.decorator");
const user_schema_1 = require("../../user/schemas/user.schema");
const subject_service_1 = require("./subject.service");
let SubjectController = class SubjectController {
    constructor(sbj$) {
        this.sbj$ = sbj$;
    }
    async getAll() {
        return await this.sbj$.getAll();
    }
    async getById(id) {
        return await this.sbj$.getById(id);
    }
    async create(dto) {
        return await this.sbj$.create(dto);
    }
    async edit(dto) {
        return await this.sbj$.edit(dto);
    }
    async delete(id) {
        return await this.sbj$.delete(id);
    }
};
__decorate([
    (0, common_1.Get)("all"),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.student),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.student),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, body_without_decorator_1.BodyWithout)(["_id"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(""),
    __param(0, (0, body_without_decorator_1.BodyWithout)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "edit", null);
__decorate([
    (0, common_1.Delete)(""),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectController.prototype, "delete", null);
SubjectController = __decorate([
    (0, common_1.Controller)("subject"),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.admin),
    __metadata("design:paramtypes", [subject_service_1.SubjectService])
], SubjectController);
exports.SubjectController = SubjectController;
//# sourceMappingURL=subject.controller.js.map