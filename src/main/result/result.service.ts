import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExcBadRequest, ExcIntError, ExcNotFound } from "src/global/models/exception.models";
import { User, UserDocument } from "src/user/schemas/user.schema";
import { Attempt, AttemptDocument } from "../attempt/schemas/attempt.schema";
import { Test, TestDocument } from "../test/schemas/test.schema";
import { CreateResultDTO } from "./dtos/result.dtos";
import { Result, ResultDocument } from "./schemas/result.schema";

@Injectable()

export class ResultService {
    constructor(
        @InjectModel(Result.name) private resultMdl: Model<ResultDocument>,
        @InjectModel(Attempt.name) private attemptMdl: Model<AttemptDocument>,
        @InjectModel(Test.name) private testMdl: Model<TestDocument>,
        @InjectModel(User.name) private userMdl: Model<UserDocument>
    ) {}

    async createResult (attempt: Attempt) {
        try {
            console.log(attempt);
            let test = await this.testMdl.findById(attempt.testId).populate("questions");
            let result: CreateResultDTO = {
                attempt: attempt._id as unknown as Attempt,
                correctAnswers: 0,
                questionCount: 0,
                questions: [],
                user: attempt.user
            }
            test.questions.forEach(question => {
                let selectedAnswer = attempt.answers.find(ans => (ans.questionId.toString() === question._id.toString()));
                if (selectedAnswer) {
                    console.log(question);

                    if (question.result&&selectedAnswer.answerId.toString() === question.result.toString()) {
                        result.correctAnswers++;
                    }
                    result.questionCount++;
                    result.questions.push({
                        ...question,
                        selectedAnswer: selectedAnswer.answerId,
                        testId: test._id
                    })
                }
            })
            let savedResult = await (new this.resultMdl(result)).save();
            return savedResult;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async getAllResults(isCount: boolean = false) {
        try {
            if (isCount) {
                let results = await this.resultMdl.find().count();
                return results;
            }
            let results = await this.resultMdl.find()
                .populate("attempt")
                .populate("user");
            return results;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async getResultById(id: string) {
        try {
            let result = await this.resultMdl.findById(id).populate("attempt");
            if (!result) throw new ExcNotFound();
            return result;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }
    async getResultByAttempt(id: string) {
        try {
            let result = await this.resultMdl.findOne({attempt: id});
            if (!result) throw new ExcNotFound();
            return result;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async getMyResults(user: User, isCount: boolean = false) {
        try {
            if (isCount) {
                let results = await this.resultMdl.find({user: user._id}).count();
                return results;
            }
            let results = await this.resultMdl.find({user: user._id})
                .populate("attempt")
                .populate("user");
            return results;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async getResultByTestId(id: string) {
        try {
            if (!id) throw new ExcBadRequest();
            let attempts = await this.attemptMdl.find({testId: id});
            let results = await this.resultMdl.find({attempt: {$in: attempts.map(a => a._id)}})
                .populate("attempt")
                .populate("user");
            return results;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }
}