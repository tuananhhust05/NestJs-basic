import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "../../test/schemas/answer.schema";
import * as mongoose from "mongoose";

export type AttemptQuestionDocument = AttemptQuestion & Document;

@Schema({collection: "attemptquestions"})
export class AttemptQuestion {
    _id?: string;
    @Prop({required: true})
    defId: string
    @Prop({required: false, default: "Câu trả lời"})
    content: string
    @Prop({required: true, type: [AnswerSchema]})
    answers: Answer[]
}

export let AttemptQuestionSchema = SchemaFactory.createForClass(AttemptQuestion);