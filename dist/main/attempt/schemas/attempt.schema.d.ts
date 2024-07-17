import * as mongoose from "mongoose";
import { AttemptAnswer } from "src/main/attempt/schemas/attempt-answer.schema";
import { Test } from "src/main/test/schemas/test.schema";
import { User } from "src/user/schemas/user.schema";
import { AttemptQuestion } from "./attempt-question.schema";
export declare type AttemptDocument = Attempt & Document;
export declare class Attempt {
    _id: string;
    user: User;
    testId: Test;
    subject: any;
    subjectType: any;
    testFormality: string;
    testDuration: number;
    title: string;
    type: string;
    questions: AttemptQuestion[];
    answers: AttemptAnswer[];
    startTime: Date;
    endTime: Date;
    submitTime?: Date;
}
export declare let AttemptSchema: mongoose.Schema<Attempt, mongoose.Model<Attempt, any, any, any, any>, {}, {}, {}, {}, "type", Attempt>;
