import * as mongoose from "mongoose";
import { Question } from "./question.schema";
export declare enum TestStatusEnum {
    pending = 0,
    open = 1,
    closed = -1
}
export declare type TestDocument = Test & Document;
export declare class Test {
    _id: string;
    subject: any;
    subjectType: any;
    testFormality: string;
    attendanceCount: number;
    testDuration: number;
    title: string;
    type: string;
    questions: Question[];
    status: number;
    timestamp: Date;
}
export declare let TestSchema: mongoose.Schema<Test, mongoose.Model<Test, any, any, any, any>, {}, {}, {}, {}, "type", Test>;
