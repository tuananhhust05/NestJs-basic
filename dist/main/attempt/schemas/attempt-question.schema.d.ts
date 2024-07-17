import { Answer } from "../../test/schemas/answer.schema";
import * as mongoose from "mongoose";
export declare type AttemptQuestionDocument = AttemptQuestion & Document;
export declare class AttemptQuestion {
    _id?: string;
    defId: string;
    content: string;
    answers: Answer[];
}
export declare let AttemptQuestionSchema: mongoose.Schema<AttemptQuestion, mongoose.Model<AttemptQuestion, any, any, any, any>, {}, {}, {}, {}, "type", AttemptQuestion>;
