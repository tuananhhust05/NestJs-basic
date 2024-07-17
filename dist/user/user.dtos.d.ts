import { ARole, User } from "./schemas/user.schema";
export declare type CreateUserDTO = Omit<User, "_id">;
export declare type EditUserDTO = User;
export interface CreateFirebaseUserDTO {
    email: string;
    password: string;
    fullname: string;
    role?: ARole;
}
export interface ChangeMyPasswordDTO {
    password: string;
}
export interface ChangeUserPasswordDTO {
    uid: string;
    password: string;
}
export declare type EditProfileDTO = User;
