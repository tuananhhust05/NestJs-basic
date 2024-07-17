import { AttemptAnswer } from "../schemas/attempt-answer.schema"
import { Attempt } from "../schemas/attempt.schema"

export interface StartAttemptDTO {
    testId: string
}

export type CreateAttemptDTO = Omit<Attempt, "_id">

export type UpdateAttemptDTO = {answers: AttemptAnswer[]}