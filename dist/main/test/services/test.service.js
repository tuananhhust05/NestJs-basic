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
exports.TestService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const file_service_1 = require("../../../file/services/file.service");
const exception_models_1 = require("../../../global/models/exception.models");
const test_schema_1 = require("../schemas/test.schema");
const question_service_1 = require("./question.service");
let TestService = class TestService {
    constructor(testMdl, f$, qst$) {
        this.testMdl = testMdl;
        this.f$ = f$;
        this.qst$ = qst$;
    }
    async getAllTests(skip, limit, subject, subjectType, isCount = false) {
        try {
            let query = {};
            let options = {};
            if (limit) {
                options.limit = limit;
            }
            if (skip) {
                options.skip = skip;
            }
            if (subject) {
                query.subject = subject;
            }
            if (subjectType) {
                query.subjectType = subjectType;
            }
            options.sort = { timestamp: -1 };
            console.log(query, options);
            if (isCount) {
                let testsCount = await this.testMdl.find(query, {}, options).count();
                return testsCount;
            }
            let tests = await this.testMdl.find(query, {}, options).populate("questions")
                .populate("subject")
                .populate("subjectType");
            return tests;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getAllOpenTests(skip, limit, subject, subjectType, isCount = false) {
        try {
            let query = {};
            let options = {};
            if (limit) {
                options.limit = limit;
            }
            if (skip) {
                options.skip = skip;
            }
            if (subject) {
                query.subject = subject;
            }
            if (subjectType) {
                query.subjectType = subjectType;
            }
            query.status = test_schema_1.TestStatusEnum.open;
            options.sort = { timestamp: -1 };
            console.log(query, options);
            if (isCount) {
                let testsCount = await this.testMdl.find(query, {}, options).count();
                return testsCount;
            }
            let tests = await this.testMdl.find(query, {}, options)
                .populate("subject")
                .populate("subjectType");
            return tests;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getTestById(id) {
        try {
            let test = await this.testMdl.findById(id)
                .populate("subject")
                .populate("subjectType")
                .populate("questions");
            if (!test)
                throw new exception_models_1.ExcNotFound();
            return test;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async createTest(dto) {
        try {
            let savedTest = await (new this.testMdl(dto)).save();
            return savedTest;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async editTest(dto) {
        try {
            let oldTest = await this.testMdl.findByIdAndUpdate(dto._id, dto);
            if (!oldTest)
                throw new exception_models_1.ExcNotFound();
            let updatedTest = await this.testMdl.findById(dto._id);
            return updatedTest;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async changeTestStatus(dto) {
        try {
            let _oldTest = await this.testMdl.findByIdAndUpdate(dto._id, { status: dto.status });
            if (!_oldTest)
                throw new exception_models_1.ExcNotFound();
            let _updatedTest = await this.testMdl.findById(_oldTest._id);
            return _updatedTest;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async deleteTest(id) {
        try {
            let _deletedTest = await this.testMdl.findByIdAndDelete(id).populate("questions");
            let deletePromises = [];
            for (let i = 0; i < _deletedTest.questions.length; i++) {
                let question = _deletedTest.questions[i];
                let promise = this.qst$.deleteQuestion(question._id);
                deletePromises.push(promise);
            }
            let deletedQuestions = await Promise.all(deletePromises);
            console.log(deletedQuestions);
            return _deletedTest;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
};
TestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(test_schema_1.Test.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_service_1.FileService,
        question_service_1.QuestionService])
], TestService);
exports.TestService = TestService;
//# sourceMappingURL=test.service.js.map