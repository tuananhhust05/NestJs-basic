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
exports.ResultQuestionSchema = exports.ResultQuestion = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const answer_schema_1 = require("../../test/schemas/answer.schema");
let ResultQuestion = class ResultQuestion {
};
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: "Câu trả lời" }),
    __metadata("design:type", String)
], ResultQuestion.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [answer_schema_1.AnswerSchema] }),
    __metadata("design:type", Array)
], ResultQuestion.prototype, "answers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], ResultQuestion.prototype, "result", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ResultQuestion.prototype, "resultDetail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, immutable: true }),
    __metadata("design:type", String)
], ResultQuestion.prototype, "testId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], ResultQuestion.prototype, "selectedAnswer", void 0);
ResultQuestion = __decorate([
    (0, mongoose_1.Schema)({ collection: "resultquestions" })
], ResultQuestion);
exports.ResultQuestion = ResultQuestion;
exports.ResultQuestionSchema = mongoose_1.SchemaFactory.createForClass(ResultQuestion);
//# sourceMappingURL=result-question.schema.js.map