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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const nestjs_firebase_admin_1 = require("@aginix/nestjs-firebase-admin");
const exception_models_1 = require("../global/models/exception.models");
const unique_names_generator_1 = require("unique-names-generator");
const utilities_helper_1 = require("../global/helpers/utilities.helper");
const nameConfig = {
    dictionaries: [unique_names_generator_1.names, unique_names_generator_1.names],
    separator: ' ',
    length: 2,
    style: 'capital'
};
let UserService = class UserService {
    constructor(userModel, auth$) {
        this.userModel = userModel;
        this.auth$ = auth$;
    }
    async getUserByUserId(userId) {
        try {
            const _user = await this.userModel.findOne({ userId: userId }).select("-_id, -__v");
            return _user;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getUserById(id) {
        try {
            if ((0, utilities_helper_1.isStringEmpty)(id))
                throw exception_models_1.ExcUnprEntity.queryExcFact("id");
            const _user = await this.userModel.findById(id);
            if (!_user)
                throw new exception_models_1.ExcNotFound();
            return _user;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getPopulatedUser(id) {
        try {
            if ((0, utilities_helper_1.isStringEmpty)(id))
                throw exception_models_1.ExcUnprEntity.queryExcFact("id");
            const _user = await this.userModel.findById(id).populate("attempt");
            if (!_user)
                throw new exception_models_1.ExcNotFound();
            if (_user.attempt) {
                let isAttemptExpired = new Date(_user.attempt.endTime).getTime() < new Date().getTime() + 10000;
                if (isAttemptExpired) {
                    await this.userModel.findByIdAndUpdate(_user._id, { attempt: null });
                    _user.attempt = null;
                }
            }
            return _user;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getAllUser() {
        try {
            return await this.userModel.find();
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getUserFromToken(token) {
        try {
            const _fbUser = await this.auth$.verifyIdToken(token);
            const _user = await this.getUserByUserId(_fbUser.uid);
            if (_user)
                return _user;
            let providers = _fbUser.firebase.identities;
            let email = _fbUser.email;
            let type = user_schema_1.AccountType.email;
            let fullname = (0, unique_names_generator_1.uniqueNamesGenerator)(nameConfig);
            if (providers['google.com']) {
                type = user_schema_1.AccountType.google;
                if (Array.isArray(providers['google.com'].email))
                    email = providers['google.com'].email[0];
                if (_fbUser.name)
                    fullname = _fbUser.name;
            }
            return await this.createUser({
                userId: _fbUser.uid,
                role: user_schema_1.ARole.student,
                fullname: fullname,
                email: email,
                accountType: type
            });
        }
        catch (err) {
            console.log(err);
            throw new exception_models_1.ExcUnprEntity(undefined, "Token không đúng");
        }
    }
    async createUser(dto) {
        try {
            return await (new this.userModel(dto)).save();
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async editUser(dto) {
        try {
            dto.isFirst = false;
            const _user = await this.userModel.findByIdAndUpdate(dto._id, dto);
            if (!_user)
                throw new exception_models_1.ExcNotFound();
            return await this.userModel.findById(_user._id);
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async deleteUser(id) {
        try {
            if ((0, utilities_helper_1.isStringEmpty)(id))
                throw exception_models_1.ExcUnprEntity.queryExcFact("id");
            const _user = await this.userModel.findByIdAndDelete(id);
            if (!_user)
                throw new exception_models_1.ExcNotFound();
            await this.auth$.deleteUser(_user.userId);
            return _user;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async createFirebaseUser(dto) {
        var _a;
        try {
            if ((0, utilities_helper_1.isStringEmpty)(dto.email))
                throw exception_models_1.ExcUnprEntity.fieldExcFact(".email");
            if ((0, utilities_helper_1.isStringEmpty)(dto.password))
                throw exception_models_1.ExcUnprEntity.fieldExcFact(".password");
            if ((0, utilities_helper_1.isStringEmpty)(dto.fullname))
                throw exception_models_1.ExcUnprEntity.fieldExcFact(".fullname");
            const _auth = await this.auth$.createUser({
                email: dto.email,
                password: dto.password,
                emailVerified: true
            });
            return await this.createUser({
                fullname: dto.fullname,
                email: dto.email,
                userId: _auth.uid,
                role: (_a = dto.role) !== null && _a !== void 0 ? _a : user_schema_1.ARole.student,
                accountType: user_schema_1.AccountType.email,
            });
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async changeUserPassword(uid, password) {
        try {
            await this.auth$.updateUser(uid, { password: password });
            return true;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        nestjs_firebase_admin_1.FirebaseAuthenticationService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map