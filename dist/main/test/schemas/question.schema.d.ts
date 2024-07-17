import { Answer } from "./answer.schema";
import * as mongoose from "mongoose";
export declare type QuestionDocument = Question & Document;
export declare class Question {
    _id: string;
    content: string;
    answers: Answer[];
    result?: string;
    resultDetail?: string;
    testId: string;
}
export declare let QuestionSchema: mongoose.Schema<Question, mongoose.Model<Question, any, any, any, any>, {}, {}, {}, {}, "type", Question>;
