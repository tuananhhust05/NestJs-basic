"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const attempt_controller_1 = require("./attempt/controllers/attempt.controller");
const attempt_schema_1 = require("./attempt/schemas/attempt.schema");
const attempt_service_1 = require("./attempt/services/attempt.service");
const result_controller_1 = require("./result/result.controller");
const result_service_1 = require("./result/result.service");
const result_schema_1 = require("./result/schemas/result.schema");
const subject_controller_1 = require("./subject/subject.controller");
const subject_schema_1 = require("./subject/subject.schema");
const subject_service_1 = require("./subject/subject.service");
const subject_type_controller_1 = require("./subjectType/subject-type.controller");
const subject_type_schema_1 = require("./subjectType/subject-type.schema");
const subject_type_service_1 = require("./subjectType/subject-type.service");
const answer_controller_1 = require("./test/controllers/answer.controller");
const question_controller_1 = require("./test/controllers/question.controller");
const test_controller_1 = require("./test/controllers/test.controller");
const answer_schema_1 = require("./test/schemas/answer.schema");
const question_schema_1 = require("./test/schemas/question.schema");
const test_schema_1 = require("./test/schemas/test.schema");
const question_service_1 = require("./test/services/question.service");
const test_service_1 = require("./test/services/test.service");
let MainModule = class MainModule {
};
MainModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: question_schema_1.Question.name, schema: question_schema_1.QuestionSchema },
                { name: answer_schema_1.Answer.name, schema: answer_schema_1.AnswerSchema },
                { name: test_schema_1.Test.name, schema: test_schema_1.TestSchema },
                { name: subject_type_schema_1.SubjectType.name, schema: subject_type_schema_1.SubjectTypeSchema },
                { name: subject_schema_1.Subject.name, schema: subject_schema_1.SubjectSchema },
                { name: attempt_schema_1.Attempt.name, schema: attempt_schema_1.AttemptSchema },
                { name: result_schema_1.Result.name, schema: result_schema_1.ResultSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ])
        ],
        providers: [
            question_service_1.QuestionService,
            test_service_1.TestService,
            subject_service_1.SubjectService,
            subject_type_service_1.SubjectTypeService,
            attempt_service_1.AttemptService,
            result_service_1.ResultService
        ],
        controllers: [
            question_controller_1.QuestionController,
            answer_controller_1.AnswerController,
            test_controller_1.TestController,
            subject_controller_1.SubjectController,
            subject_type_controller_1.SubjectTypeController,
            attempt_controller_1.AttemptController,
            result_controller_1.ResultController
        ]
    })
], MainModule);
exports.MainModule = MainModule;
//# sourceMappingURL=main.module.js.map