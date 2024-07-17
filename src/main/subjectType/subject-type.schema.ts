import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type SubjectTypeDocument = SubjectType & Document;

@Schema({collection: "subjecttypes"})
export class SubjectType {
    _id: string;
    @Prop({required: true})
    name: string;
    @Prop({required: true})
    subjectId: string
}

export let SubjectTypeSchema = SchemaFactory.createForClass(SubjectType);