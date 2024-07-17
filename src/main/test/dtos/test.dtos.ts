import { Test, TestStatusEnum } from "../schemas/test.schema";

export type CreateTestDTO = Omit<Test, "_id"| "questions">;

export type EditTestDTO = Test;

export interface ChangeTestStatusDTO {
    _id: string,
    status: TestStatusEnum
}