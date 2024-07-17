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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const exception_models_1 = require("../../../global/models/exception.models");
const question_schema_1 = require("../schemas/question.schema");
const test_schema_1 = require("../schemas/test.schema");
let QuestionService = class QuestionService {
    constructor(qstMdl, testMdl) {
        this.qstMdl = qstMdl;
        this.testMdl = testMdl;
    }
    async getAll() {
        try {
            let questions = await this.qstMdl.find();
            return questions;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getById(id) {
        try {
            let question = await this.qstMdl.findById(id);
            if (!question)
                throw new exception_models_1.ExcNotFound();
            return question;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async createQuestion(dto) {
        try {
            let test = await this.testMdl.findById(dto.testId);
            if (!test)
                throw new exception_models_1.ExcBadRequest();
            let savedQuesion = await (new this.qstMdl(dto)).save();
            await this.testMdl.findByIdAndUpdate(dto.testId, { $addToSet: { questions: savedQuesion._id } });
            if (!dto.answerCount || dto.answerCount <= 0)
                dto.answerCount = 1;
            let promises = [];
            for (let i = 0; i < dto.answerCount; i++) {
                promises.push(this.createAnswer({
                    content: "Câu trả lời",
                    questionId: savedQuesion._id
                }));
            }
            await Promise.all(promises);
            await this.qstMdl.findByIdAndUpdate(savedQuesion._id, { result: (await this.qstMdl.findById(savedQuesion._id)).answers[0]._id });
            const populatedQuestion = await this.qstMdl.findById(savedQuesion._id);
            return populatedQuestion;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async editQuestion(dto) {
        try {
            let oldQuestion = await this.qstMdl.findById(dto._id);
            if (!oldQuestion)
                throw new exception_models_1.ExcNotFound();
            let question = await this.qstMdl.findByIdAndUpdate(dto._id, dto);
            let updatedQuestion = await this.qstMdl.findById(question._id);
            return updatedQuestion;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async deleteQuestion(id) {
        try {
            let _deletedQuestion = await this.qstMdl.findByIdAndDelete(id);
            if (!_deletedQuestion)
                throw new exception_models_1.ExcNotFound();
            await this.testMdl.findByIdAndUpdate(_deletedQuestion.testId, { $pull: { questions: _deletedQuestion._id } });
            return _deletedQuestion;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async createAnswer(dto) {
        try {
            console.log(dto);
            let oldQuestion = await this.qstMdl.findByIdAndUpdate(dto.questionId, { $push: { answers: dto } });
            if (!oldQuestion)
                throw new exception_models_1.ExcNotFound();
            let updatedQuestion = await this.qstMdl.findById(oldQuestion._id);
            return updatedQuestion;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async editAnswer(dto) {
        try {
            let oldQuestion = await this.qstMdl.findById(dto.questionId);
            if (!oldQuestion)
                throw new exception_models_1.ExcNotFound();
            let oldAnswer = oldQuestion.answers.find(a => a._id.toString() === dto._id.toString());
            if (!oldAnswer)
                throw new exception_models_1.ExcNotFound();
            let answerIndex = oldQuestion.answers.indexOf(oldAnswer);
            oldQuestion.answers[answerIndex] = dto;
            let question = await this.qstMdl.findByIdAndUpdate(dto.questionId, oldQuestion);
            let updatedQuestion = await this.qstMdl.findById(question._id);
            return updatedQuestion;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async deleteAnswer(questionId, answerId) {
        try {
            let oldQuestion = await this.qstMdl.findById(questionId);
            if (!oldQuestion)
                throw new exception_models_1.ExcNotFound();
            let oldAnswer = oldQuestion.answers.find(a => a._id.toString() === answerId.toString());
            if (!oldAnswer)
                throw new exception_models_1.ExcNotFound();
            let question = await this.qstMdl.findByIdAndUpdate(questionId, { $pull: { answers: { _id: answerId } } });
            await this.qstMdl.updateOne({ result: answerId }, { result: null });
            let updatedQuestion = await this.qstMdl.findById(question._id);
            return updatedQuestion;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
};
QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __param(1, (0, mongoose_1.InjectModel)(test_schema_1.Test.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map