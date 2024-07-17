import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "src/user/schemas/user.schema";
import { Question } from "./question.schema";

export enum TestStatusEnum {
    pending = 0,
    open = 1,
    closed = -1
}

export type TestDocument = Test & Document;

@Schema({collection: "tests"})
export class Test {
    _id: string;
    // @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    // author: User;
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Subject"})
    subject: any;
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "SubjectType"})
    subjectType: any;
    @Prop({required: true})
    testFormality: string;
    @Prop({default: 0, required: false})
    attendanceCount: number
    @Prop({required: true}) //In minutes
    testDuration: number
    @Prop({required: true})
    title: string;
    @Prop({required: true})
    type: string;
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Question", default: []}])
    questions: Question[]
    @Prop({required: false, default: TestStatusEnum.pending})
    status: number;
    @Prop({required: false, default: Date.now})
    timestamp: Date;
}

export let TestSchema = SchemaFactory.createForClass(Test);