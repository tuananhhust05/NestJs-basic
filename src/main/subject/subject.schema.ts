import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type SubjectDocument = Subject & Document;

@Schema({collection: "subjects"})
export class Subject {
    _id: string;
    @Prop({required: true})
    name: string;
    @Prop({required: true})
    id: string
}

export let SubjectSchema = SchemaFactory.createForClass(Subject);