import * as mongoose from "mongoose";
import { Attempt } from "src/main/attempt/schemas/attempt.schema";
import { User } from "src/user/schemas/user.schema";
import { ResultQuestion } from "./result-question.schema";
export declare type ResultDocument = Result & Document;
export declare class Result {
    _id: string;
    correctAnswers: number;
    questionCount: number;
    user: User;
    attempt: Attempt;
    questions: ResultQuestion[];
}
export declare let ResultSchema: mongoose.Schema<Result, mongoose.Model<Result, any, any, any, any>, {}, {}, {}, {}, "type", Result>;
