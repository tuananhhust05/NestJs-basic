import { Answer } from "../schemas/answer.schema";
import { Question } from "../schemas/question.schema";

export type CreateQuestionDTO = Omit<Question, "_id"|"answers"> & {answerCount: number}

export type EditQuestionDTO = Omit<Question, "testId">;

export type CreateAnswerDTO = Omit<Answer, "_id"> & {questionId: string};
export type EditAnswerDTO = Answer & {questionId: string};