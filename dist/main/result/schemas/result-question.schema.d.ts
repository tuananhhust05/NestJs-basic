import { Answer } from "../../test/schemas/answer.schema";
import * as mongoose from "mongoose";
export declare type ResultQuestionDocument = ResultQuestion & Document;
export declare class ResultQuestion {
    _id?: string;
    content: string;
    answers: Answer[];
    result?: string;
    resultDetail?: string;
    testId: string;
    selectedAnswer?: string;
}
export declare let ResultQuestionSchema: mongoose.Schema<ResultQuestion, mongoose.Model<ResultQuestion, any, any, any, any>, {}, {}, {}, {}, "type", ResultQuestion>;
