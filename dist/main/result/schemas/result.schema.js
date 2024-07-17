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
exports.ResultSchema = exports.Result = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const attempt_schema_1 = require("../../attempt/schemas/attempt.schema");
const user_schema_1 = require("../../../user/schemas/user.schema");
const result_question_schema_1 = require("./result-question.schema");
let Result = class Result {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Result.prototype, "correctAnswers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Result.prototype, "questionCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", user_schema_1.User)
], Result.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: "Attempt", required: true }),
    __metadata("design:type", attempt_schema_1.Attempt)
], Result.prototype, "attempt", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: result_question_schema_1.ResultQuestionSchema, required: true }]),
    __metadata("design:type", Array)
], Result.prototype, "questions", void 0);
Result = __decorate([
    (0, mongoose_1.Schema)({ collection: "results" })
], Result);
exports.Result = Result;
exports.ResultSchema = mongoose_1.SchemaFactory.createForClass(Result);
//# sourceMappingURL=result.schema.js.map