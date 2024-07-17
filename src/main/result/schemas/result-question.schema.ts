import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "../../test/schemas/answer.schema";
import * as mongoose from "mongoose";
import { FileRecord } from "src/file/schemas/file-record.schema";

export type ResultQuestionDocument = ResultQuestion & Document;

@Schema({collection: "resultquestions"})
export class ResultQuestion {
    _id?: string;
    @Prop({required: false, default: "Câu trả lời"})
    content: string
    @Prop({required: true, type: [AnswerSchema]})
    answers: Answer[]
    @Prop({required: false, default: null})
    result?: string
    @Prop()
    resultDetail?: string;
    @Prop({required: true, immutable: true})
    testId: string

    @Prop({required: false, default: null})
    selectedAnswer?: string
}

export let ResultQuestionSchema = SchemaFactory.createForClass(ResultQuestion);