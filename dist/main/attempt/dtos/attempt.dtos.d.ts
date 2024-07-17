import { AttemptAnswer } from "../schemas/attempt-answer.schema";
import { Attempt } from "../schemas/attempt.schema";
export interface StartAttemptDTO {
    testId: string;
}
export declare type CreateAttemptDTO = Omit<Attempt, "_id">;
export declare type UpdateAttemptDTO = {
    answers: AttemptAnswer[];
};
