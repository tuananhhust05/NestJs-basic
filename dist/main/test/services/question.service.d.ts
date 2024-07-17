/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { CreateAnswerDTO, CreateQuestionDTO, EditAnswerDTO, EditQuestionDTO } from "../dtos/question.dtos";
import { Question, QuestionDocument } from "../schemas/question.schema";
import { TestDocument } from "../schemas/test.schema";
export declare class QuestionService {
    private qstMdl;
    private testMdl;
    constructor(qstMdl: Model<QuestionDocument>, testMdl: Model<TestDocument>);
    getAll(): Promise<(import("mongoose").Document<unknown, any, QuestionDocument> & Question & Document & Required<{
        _id: string;
    }>)[]>;
    getById(id: string): Promise<import("mongoose").Document<unknown, any, QuestionDocument> & Question & Document & Required<{
        _id: string;
    }>>;
    createQuestion(dto: CreateQuestionDTO): Promise<import("mongoose").Document<unknown, any, QuestionDocument> & Question & Document & Required<{
        _id: string;
    }>>;
    editQuestion(dto: EditQuestionDTO): Promise<import("mongoose").Document<unknown, any, QuestionDocument> & Question & Document & Required<{
        _id: string;
    }>>;
    deleteQuestion(id: string): Promise<import("mongoose").Document<unknown, any, QuestionDocument> & Question & Document & Required<{
        _id: string;
    }>>;
    createAnswer(dto: CreateAnswerDTO): Promise<import("mongoose").Document<unknown, any, QuestionDocument> & Question & Document & Required<{
        _id: string;
    }>>;
    editAnswer(dto: EditAnswerDTO): Promise<import("mongoose").Document<unknown, any, QuestionDocument> & Question & Document & Required<{
        _id: string;
    }>>;
    deleteAnswer(questionId: string, answerId: string): Promise<import("mongoose").Document<unknown, any, QuestionDocument> & Question & Document & Required<{
        _id: string;
    }>>;
}
