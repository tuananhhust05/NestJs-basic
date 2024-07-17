import { Test, TestStatusEnum } from "../schemas/test.schema";
export declare type CreateTestDTO = Omit<Test, "_id" | "questions">;
export declare type EditTestDTO = Test;
export interface ChangeTestStatusDTO {
    _id: string;
    status: TestStatusEnum;
}
