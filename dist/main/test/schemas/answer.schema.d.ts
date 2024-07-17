import * as mongoose from "mongoose";
export declare type AnswerDocument = Answer & Document;
export declare class Answer {
    _id: string;
    content: string;
    defId?: string;
}
export declare let AnswerSchema: mongoose.Schema<Answer, mongoose.Model<Answer, any, any, any, any>, {}, {}, {}, {}, "type", Answer>;
