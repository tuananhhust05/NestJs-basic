import { Answer } from "../schemas/answer.schema";
import { Question } from "../schemas/question.schema";
export declare type CreateQuestionDTO = Omit<Question, "_id" | "answers"> & {
    answerCount: number;
};
export declare type EditQuestionDTO = Omit<Question, "testId">;
export declare type CreateAnswerDTO = Omit<Answer, "_id"> & {
    questionId: string;
};
export declare type EditAnswerDTO = Answer & {
    questionId: string;
};
