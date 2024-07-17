import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Attempt } from "src/main/attempt/schemas/attempt.schema";
export declare enum AccountType {
    email = "email",
    google = "google"
}
export declare enum ARole {
    admin = "admin",
    student = "student"
}
export declare type UserDocument = User & Document;
export declare class User {
    _id: string;
    userId: string;
    accountType: AccountType;
    role: ARole;
    fullname: string;
    dateOfBirth?: string;
    isFirst?: boolean;
    email?: string;
    phoneNumber?: string;
    identifier?: string;
    gender?: string;
    attempt?: Attempt;
}
export declare let UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
