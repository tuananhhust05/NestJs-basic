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
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const body_without_decorator_1 = require("../../../global/decorators/body-without.decorator");
const role_decorator_1 = require("../../../global/decorators/role.decorator");
const user_schema_1 = require("../../../user/schemas/user.schema");
const question_service_1 = require("../services/question.service");
let AnswerController = class AnswerController {
    constructor(qst$) {
        this.qst$ = qst$;
    }
    async createAnswer(dto) {
        return await this.qst$.createAnswer(dto);
    }
    async editAnswer(dto) {
        return await this.qst$.editAnswer(dto);
    }
    async deleteAnswer(questionId, answerId) {
        return await this.qst$.deleteAnswer(questionId, answerId);
    }
};
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, body_without_decorator_1.BodyWithout)(["_id"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "createAnswer", null);
__decorate([
    (0, common_1.Patch)(""),
    __param(0, (0, body_without_decorator_1.BodyWithout)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "editAnswer", null);
__decorate([
    (0, common_1.Delete)(""),
    __param(0, (0, common_1.Query)("questionId")),
    __param(1, (0, common_1.Query)("answerId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "deleteAnswer", null);
AnswerController = __decorate([
    (0, common_1.Controller)("answer"),
    (0, role_decorator_1.Roles)(user_schema_1.ARole.admin),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], AnswerController);
exports.AnswerController = AnswerController;
//# sourceMappingURL=answer.controller.js.map