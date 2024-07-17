import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { FileRecord } from "src/file/schemas/file-record.schema";

export type AnswerDocument = Answer & Document;

@Schema({collection: "answers"})
export class Answer {
    _id: string;
    @Prop({required: false, default: "Câu trả lời"})
    content: string
    @Prop({required: false})
    defId?: string
}

export let AnswerSchema = SchemaFactory.createForClass(Answer);