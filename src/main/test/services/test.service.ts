import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FileService } from "src/file/services/file.service";
import { ExcIntError, ExcNotFound } from "src/global/models/exception.models";
import { ChangeTestStatusDTO, CreateTestDTO, EditTestDTO } from "../dtos/test.dtos";
import { Test, TestDocument, TestStatusEnum } from "../schemas/test.schema";
import { QuestionService } from "./question.service";

@Injectable()

export class TestService {
    constructor(
        @InjectModel(Test.name) private testMdl: Model<TestDocument>,
        private f$: FileService,
        private qst$: QuestionService
        ) { }

    async getAllTests(
        skip?: number,
        limit ?:number,
        subject?:string,
        subjectType?:string,
        isCount: boolean = false) {
        try {
            let query:any = {};
            let options:any = {};
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
            options.sort = {timestamp: -1}
            console.log(query, options);
            if (isCount) {
                let testsCount = await this.testMdl.find(query, {}, options).count();
                return testsCount
            }
            let tests = await this.testMdl.find(query, {}, options).populate("questions")
            .populate("subject")
            .populate("subjectType");
            return tests;
        } catch (err) {
            throw new ExcIntError(err)
        }
    }

    async getAllOpenTests(
        skip?: number,
        limit ?:number,
        subject?:string,
        subjectType?:string,
        isCount: boolean = false) {
        try {
            let query:any = {};
            let options:any = {};
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
            query.status = TestStatusEnum.open;
            options.sort = {timestamp: -1}
            console.log(query, options);
            if (isCount) {
                let testsCount = await this.testMdl.find(query, {}, options).count();
                return testsCount
            }
            let tests = await this.testMdl.find(query, {}, options)
                .populate("subject")
                .populate("subjectType");
            return tests;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async getTestById(id: string) {
        try {
            let test = await this.testMdl.findById(id)
                .populate("subject")
                .populate("subjectType")
                .populate("questions");
            if (!test) throw new ExcNotFound();
            return test;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async createTest(dto: CreateTestDTO) {
        try {
            let savedTest = await (new this.testMdl(dto)).save();
            return savedTest;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async editTest(dto: EditTestDTO) {
        try {
            let oldTest = await this.testMdl.findByIdAndUpdate(dto._id, dto);
            if (!oldTest) throw new ExcNotFound();
            let updatedTest = await this.testMdl.findById(dto._id);
            return updatedTest;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async changeTestStatus(dto: ChangeTestStatusDTO) {
        try {
            let _oldTest = await this.testMdl.findByIdAndUpdate(dto._id, {status: dto.status});
            if (!_oldTest) throw new ExcNotFound();
            let _updatedTest = await this.testMdl.findById(_oldTest._id)
            return _updatedTest;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }
    async deleteTest(id: string) {
        try {
            let _deletedTest = await this.testMdl.findByIdAndDelete(id).populate("questions");
            let deletePromises = [];
            for (let i = 0; i < _deletedTest.questions.length; i ++) {
                let question = _deletedTest.questions[i];
                let promise = this.qst$.deleteQuestion(question._id);
                deletePromises.push(promise);
            }
            let deletedQuestions = await Promise.all(deletePromises);
            console.log(deletedQuestions);

            return _deletedTest;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }
}