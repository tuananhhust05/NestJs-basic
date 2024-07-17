import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "./answer.schema";
import * as mongoose from "mongoose";
import { FileRecord } from "src/file/schemas/file-record.schema";

export type QuestionDocument = Question & Document;

@Schema({collection: "questions"})
export class Question {
    _id: string;
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
}

export let QuestionSchema = SchemaFactory.createForClass(Question);