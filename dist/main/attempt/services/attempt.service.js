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
exports.AttemptService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const exception_models_1 = require("../../../global/models/exception.models");
const result_service_1 = require("../../result/result.service");
const test_schema_1 = require("../../test/schemas/test.schema");
const user_schema_1 = require("../../../user/schemas/user.schema");
const attempt_schema_1 = require("../schemas/attempt.schema");
let AttemptService = class AttemptService {
    constructor(attemptMdl, testMdl, userMdl, result$) {
        this.attemptMdl = attemptMdl;
        this.testMdl = testMdl;
        this.userMdl = userMdl;
        this.result$ = result$;
        this.timerSubject = new rxjs_1.Subject();
        this.timerObservable = this.timerSubject.asObservable();
        this.interval = setInterval(() => {
            this.timerSubject.next();
        }, 1000);
    }
    async startAttempt(dto, user) {
        try {
            if (user.attempt) {
                throw new exception_models_1.ExcBadRequest(null, "Bạn không thể làm nhiều bài thi cùng lúc!");
            }
            let _test = await this.testMdl.findById(dto.testId).populate("questions");
            if (!_test)
                throw new exception_models_1.ExcNotFound(null, "Bài thi không tồn tại!");
            let questions = [..._test.questions];
            let attemptQuestions = [];
            questions.forEach(question => {
                let attemptQuestion = {
                    defId: question._id,
                    answers: [...question.answers].map(data => (Object.assign(Object.assign({}, data), { defId: data._id }))),
                    content: question.content
                };
                attemptQuestions.push(attemptQuestion);
            });
            let createAttemptDTO = {
                answers: [].fill(0, attemptQuestions.length - 1, null),
                questions: attemptQuestions,
                startTime: new Date(),
                endTime: new Date(Date.now() + _test.testDuration * 1000 * 60),
                testId: _test._id,
                user: user._id,
                subject: _test.subject,
                subjectType: _test.subjectType,
                testDuration: _test.testDuration,
                testFormality: _test.testFormality,
                title: _test.title,
                type: _test.type,
            };
            let savedAttempt = await (new this.attemptMdl(createAttemptDTO)).save();
            await this.userMdl.findByIdAndUpdate(user._id, { attempt: savedAttempt._id });
            let _subscription = this.timerObservable.subscribe(() => {
                if (Date.now() >= savedAttempt.endTime.getTime()) {
                    _subscription.unsubscribe();
                    this.userMdl.findById(user._id).then((_user) => {
                        this.submitAttempt(_user).then(() => {
                            console.log(`[INFO]:User ${_user._id} timed out!`);
                        });
                    });
                }
            });
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async submitAttempt(user) {
        try {
            if (!user.attempt) {
                throw new exception_models_1.ExcBadRequest();
            }
            let attempt = await this.attemptMdl.findById(user.attempt);
            let result = await this.result$.createResult(attempt);
            await this.userMdl.findByIdAndUpdate(user._id, { attempt: null });
            return result;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async updateAttempt(dto, user) {
        try {
            if (!user.attempt) {
                throw new exception_models_1.ExcBadRequest();
            }
            let oldAttempt = await this.attemptMdl.findByIdAndUpdate(user.attempt, { answers: dto.answers });
            let attempt = await this.attemptMdl.findById(oldAttempt._id);
            return attempt;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getResult(id) {
        return this.result$.getResultByAttempt(id);
    }
};
AttemptService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attempt_schema_1.Attempt.name)),
    __param(1, (0, mongoose_1.InjectModel)(test_schema_1.Test.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        result_service_1.ResultService])
], AttemptService);
exports.AttemptService = AttemptService;
//# sourceMappingURL=attempt.service.js.map