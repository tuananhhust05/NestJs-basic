import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ResultAnswerDocument = AttemptAnswer & Document;

@Schema({collection: "resultanswers"})
export class AttemptAnswer {
    _id: string;
    @Prop({required: true})
    questionId: string;
    @Prop({required: true})
    answerId: string
}

export let AttemptAnswerSchema = SchemaFactory.createForClass(AttemptAnswer);