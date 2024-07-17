import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Attempt } from "src/main/attempt/schemas/attempt.schema";

export enum AccountType {
    email = "email",
    google = "google"
}

export enum ARole {
    admin = "admin",
    student = "student",
}

export type UserDocument = User & Document;

@Schema({collection: "users"})
export class User {
    _id: string;
    @Prop({required: true})
    userId: string;
    @Prop({required: true})
    accountType: AccountType
    @Prop({required: true, default: ARole.student, enum: [ARole.student, ARole.admin]})
    role: ARole;
    @Prop({required: true})
    fullname: string;
    @Prop({required: false})
    dateOfBirth?: string;
    @Prop({required: false, default: true})
    isFirst?: boolean;
    @Prop({required: false})
    email?: string
    @Prop({required: false})
    phoneNumber?: string
    @Prop({required: false})
    identifier?: string
    @Prop({required: false, enum: ["Nam", "Nữ", "Khác"]})
    gender?: string
    @Prop({required: false, default: null, type: mongoose.Schema.Types.ObjectId, ref: "Attempt"})
    attempt?: Attempt
}

export let UserSchema = SchemaFactory.createForClass(User);