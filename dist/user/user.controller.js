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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const body_without_decorator_1 = require("../global/decorators/body-without.decorator");
const role_decorator_1 = require("../global/decorators/role.decorator");
const user_decorator_1 = require("../global/decorators/user.decorator");
const exception_models_1 = require("../global/models/exception.models");
const user_schema_1 = require("./schemas/user.schema");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(user$) {
        this.user$ = user$;
    }
    async getUser(user) {
        try {
            return this.user$.getPopulatedUser(user._id.toString());
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getUserById(id) {
        return await this.getUserById(id);
    }
    async getAllUser() {
        return await this.user$.getAllUser();
    }
    async createUser(dto) {
        return await this.user$.createFirebaseUser(dto);
    }
    async editMyProfile(user, dto) {
        dto._id = user._id;
        return await this.user$.editUser(dto);
    }
    async changeMyPassword(user, dto) {
        return await this.user$.changeUserPassword(user.userId, dto.password);
    }
    async editUser(dto) {
        return await this.user$.editUser(dto);
    }
    async changeUserPassword(dto) {
        return await this.user$.changeUserPassword(dto.uid, dto.password);
    }
    async deleteUser(id) {
        return await this.user$.deleteUser(id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.student, user_schema_1.ARole.admin),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(''),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.admin),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Post)(''),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Patch)('myprofile'),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.student, user_schema_1.ARole.admin),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __param(1, (0, body_without_decorator_1.BodyWithout)(["_id", "attempt", "accountType"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editMyProfile", null);
__decorate([
    (0, common_1.Patch)('mypassword'),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.student, user_schema_1.ARole.admin),
    __param(0, (0, user_decorator_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeMyPassword", null);
__decorate([
    (0, common_1.Patch)(''),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.admin),
    __param(0, (0, body_without_decorator_1.BodyWithout)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUser", null);
__decorate([
    (0, common_1.Patch)('password'),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.admin),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeUserPassword", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.admin),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map