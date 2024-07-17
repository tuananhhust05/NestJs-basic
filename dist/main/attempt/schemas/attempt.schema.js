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
exports.AttemptSchema = exports.Attempt = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const attempt_answer_schema_1 = require("./attempt-answer.schema");
const test_schema_1 = require("../../test/schemas/test.schema");
const user_schema_1 = require("../../../user/schemas/user.schema");
const attempt_question_schema_1 = require("./attempt-question.schema");
let Attempt = class Attempt {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: "User" }),
    __metadata("design:type", user_schema_1.User)
], Attempt.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: "Test" }),
    __metadata("design:type", test_schema_1.Test)
], Attempt.prototype, "testId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Subject" }),
    __metadata("design:type", Object)
], Attempt.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "SubjectType" }),
    __metadata("design:type", Object)
], Attempt.prototype, "subjectType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Attempt.prototype, "testFormality", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Attempt.prototype, "testDuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Attempt.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Attempt.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: attempt_question_schema_1.AttemptQuestionSchema, required: true }]),
    __metadata("design:type", Array)
], Attempt.prototype, "questions", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: attempt_answer_schema_1.AttemptAnswerSchema, required: true }]),
    __metadata("design:type", Array)
], Attempt.prototype, "answers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Attempt.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Attempt.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Date)
], Attempt.prototype, "submitTime", void 0);
Attempt = __decorate([
    (0, mongoose_1.Schema)({ collection: "attempts" })
], Attempt);
exports.Attempt = Attempt;
exports.AttemptSchema = mongoose_1.SchemaFactory.createForClass(Attempt);
//# sourceMappingURL=attempt.schema.js.map