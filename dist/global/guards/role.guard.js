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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const user_service_1 = require("../../user/user.service");
const utilities_helper_1 = require("../helpers/utilities.helper");
const exception_models_1 = require("../models/exception.models");
let RoleGuard = class RoleGuard {
    constructor(reflector, user$) {
        this.reflector = reflector;
        this.user$ = user$;
    }
    async canActivate(context) {
        var _a, _b, _c, _d;
        const rolesHandler = (_a = this.reflector.get('roles', context.getHandler())) !== null && _a !== void 0 ? _a : [];
        const rolesClass = (_b = this.reflector.get('roles', context.getClass())) !== null && _b !== void 0 ? _b : [];
        const norolesHandler = (_c = this.reflector.get('noroles', context.getHandler())) !== null && _c !== void 0 ? _c : [];
        const norolesClass = (_d = this.reflector.get('noroles', context.getClass())) !== null && _d !== void 0 ? _d : [];
        const roles = (0, utilities_helper_1.arrayUnique)([...rolesClass, ...rolesHandler]);
        const noroles = (0, utilities_helper_1.subtractArray)((0, utilities_helper_1.arrayUnique)([...norolesClass, ...norolesHandler]), rolesHandler);
        if ((0, utilities_helper_1.isArrayEmpty)(roles) && (0, utilities_helper_1.isArrayEmpty)(noroles)) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const _user = await this.getUserData(request);
        response.locals.user = _user;
        return await this.validateRole(_user, roles, noroles);
    }
    async validateRole(user, roles, noroles) {
        if ((0, utilities_helper_1.onlyWithin)(user.role, noroles))
            throw new exception_models_1.ExcForbidden();
        if ((0, utilities_helper_1.isArrayEmpty)(roles) || (0, utilities_helper_1.onlyWithin)(user.role, roles)) {
            return true;
        }
        else {
            throw new exception_models_1.ExcForbidden();
        }
    }
    async getUserData(request) {
        const _authHeader = request.headers['authorization'];
        if (_authHeader === null || _authHeader === void 0 ? void 0 : _authHeader.startsWith("Bearer ")) {
            const _token = _authHeader.substring(7, _authHeader.length);
            return this.user$.getUserFromToken(_token);
        }
        else {
            throw new exception_models_1.ExcUnauth();
        }
    }
};
RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, user_service_1.UserService])
], RoleGuard);
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map