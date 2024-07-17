import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Attempt } from "src/main/attempt/schemas/attempt.schema";
import { Test } from "src/main/test/schemas/test.schema";
import { User } from "src/user/schemas/user.schema";
import { AttemptAnswer, AttemptAnswerSchema } from "../../attempt/schemas/attempt-answer.schema";
import { ResultQuestion, ResultQuestionSchema } from "./result-question.schema";

export type ResultDocument = Result & Document;

@Schema({collection: "results"})
export class Result {
    _id: string;
    @Prop({required: true})
    correctAnswers: number;
    @Prop({required: true})
    questionCount: number;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User", required: true})
    user: User;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Attempt", required: true})
    attempt: Attempt;
    @Prop([{type: ResultQuestionSchema, required: true}])
    questions: ResultQuestion[]
}

export let ResultSchema = SchemaFactory.createForClass(Result);