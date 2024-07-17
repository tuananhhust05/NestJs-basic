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
exports.ResultService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const exception_models_1 = require("../../global/models/exception.models");
const user_schema_1 = require("../../user/schemas/user.schema");
const attempt_schema_1 = require("../attempt/schemas/attempt.schema");
const test_schema_1 = require("../test/schemas/test.schema");
const result_schema_1 = require("./schemas/result.schema");
let ResultService = class ResultService {
    constructor(resultMdl, attemptMdl, testMdl, userMdl) {
        this.resultMdl = resultMdl;
        this.attemptMdl = attemptMdl;
        this.testMdl = testMdl;
        this.userMdl = userMdl;
    }
    async createResult(attempt) {
        try {
            console.log(attempt);
            let test = await this.testMdl.findById(attempt.testId).populate("questions");
            let result = {
                attempt: attempt._id,
                correctAnswers: 0,
                questionCount: 0,
                questions: [],
                user: attempt.user
            };
            test.questions.forEach(question => {
                let selectedAnswer = attempt.answers.find(ans => (ans.questionId.toString() === question._id.toString()));
                if (selectedAnswer) {
                    console.log(question);
                    if (question.result && selectedAnswer.answerId.toString() === question.result.toString()) {
                        result.correctAnswers++;
                    }
                    result.questionCount++;
                    result.questions.push(Object.assign(Object.assign({}, question), { selectedAnswer: selectedAnswer.answerId, testId: test._id }));
                }
            });
            let savedResult = await (new this.resultMdl(result)).save();
            return savedResult;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getAllResults(isCount = false) {
        try {
            if (isCount) {
                let results = await this.resultMdl.find().count();
                return results;
            }
            let results = await this.resultMdl.find()
                .populate("attempt")
                .populate("user");
            return results;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getResultById(id) {
        try {
            let result = await this.resultMdl.findById(id).populate("attempt");
            if (!result)
                throw new exception_models_1.ExcNotFound();
            return result;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getResultByAttempt(id) {
        try {
            let result = await this.resultMdl.findOne({ attempt: id });
            if (!result)
                throw new exception_models_1.ExcNotFound();
            return result;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getMyResults(user, isCount = false) {
        try {
            if (isCount) {
                let results = await this.resultMdl.find({ user: user._id }).count();
                return results;
            }
            let results = await this.resultMdl.find({ user: user._id })
                .populate("attempt")
                .populate("user");
            return results;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getResultByTestId(id) {
        try {
            if (!id)
                throw new exception_models_1.ExcBadRequest();
            let attempts = await this.attemptMdl.find({ testId: id });
            let results = await this.resultMdl.find({ attempt: { $in: attempts.map(a => a._id) } })
                .populate("attempt")
                .populate("user");
            return results;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
};
ResultService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(result_schema_1.Result.name)),
    __param(1, (0, mongoose_1.InjectModel)(attempt_schema_1.Attempt.name)),
    __param(2, (0, mongoose_1.InjectModel)(test_schema_1.Test.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ResultService);
exports.ResultService = ResultService;
//# sourceMappingURL=result.service.js.map