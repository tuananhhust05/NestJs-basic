import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { AttemptAnswer, AttemptAnswerSchema } from "src/main/attempt/schemas/attempt-answer.schema";
import { Test, TestStatusEnum } from "src/main/test/schemas/test.schema";
import { User } from "src/user/schemas/user.schema";
import { AttemptQuestion, AttemptQuestionSchema } from "./attempt-question.schema";

export type AttemptDocument = Attempt & Document;

@Schema({collection: "attempts"})
export class Attempt {
    _id: string;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user: User;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Test"})
    testId: Test;
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Subject"})
    subject: any;
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "SubjectType"})
    subjectType: any;
    @Prop({required: true})
    testFormality: string;
    @Prop({required: true}) //In minutes
    testDuration: number
    @Prop({required: true})
    title: string;
    @Prop({required: true})
    type: string;
    @Prop([{type: AttemptQuestionSchema, required: true}])
    questions: AttemptQuestion[];
    @Prop([{type: AttemptAnswerSchema, required: true}])
    answers: AttemptAnswer[];
    @Prop({required: true})
    startTime: Date
    @Prop({required: true})
    endTime: Date
    @Prop({required: false})
    submitTime?: Date
}

export let AttemptSchema = SchemaFactory.createForClass(Attempt);