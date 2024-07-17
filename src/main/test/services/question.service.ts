import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExcBadRequest, ExcIntError, ExcNotFound } from "src/global/models/exception.models";
import { CreateAnswerDTO, CreateQuestionDTO, EditAnswerDTO, EditQuestionDTO } from "../dtos/question.dtos";
import { Question, QuestionDocument } from "../schemas/question.schema";
import { Test, TestDocument } from "../schemas/test.schema";

@Injectable()

export class QuestionService {
    constructor(
        @InjectModel(Question.name) private qstMdl: Model<QuestionDocument>,
        @InjectModel(Test.name) private testMdl: Model<TestDocument>) {}
    
    async getAll() {
        try {
            let questions = await this.qstMdl.find();
            return questions
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async getById(id: string) {
        try {
            let question = await this.qstMdl.findById(id);
            if (!question) throw new ExcNotFound();
            return question;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async createQuestion(dto: CreateQuestionDTO) {
        try {
            let test = await this.testMdl.findById(dto.testId);
            if (!test) throw new ExcBadRequest();
            let savedQuesion = await (new this.qstMdl(dto)).save();
            await this.testMdl.findByIdAndUpdate(dto.testId, {$addToSet:{questions: savedQuesion._id}});
            if (!dto.answerCount||dto.answerCount <= 0) dto.answerCount = 1;
            let promises = [];
            for (let i = 0; i < dto.answerCount; i++) {
                promises.push(this.createAnswer({
                    content: "Câu trả lời",
                    questionId: savedQuesion._id
                }))
            }
            await Promise.all(promises);
            await this.qstMdl.findByIdAndUpdate(savedQuesion._id, {result: (await this.qstMdl.findById(savedQuesion._id)).answers[0]._id})
            const populatedQuestion = await this.qstMdl.findById(savedQuesion._id);
            return populatedQuestion;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async editQuestion(dto: EditQuestionDTO) {
        try {
            let oldQuestion = await this.qstMdl.findById(dto._id);
            if (!oldQuestion) throw new ExcNotFound();
            let question = await this.qstMdl.findByIdAndUpdate(dto._id, dto);
            let updatedQuestion = await this.qstMdl.findById(question._id);
            return updatedQuestion;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async deleteQuestion(id: string) {
        try {
            let _deletedQuestion = await this.qstMdl.findByIdAndDelete(id);
            if (!_deletedQuestion) throw new ExcNotFound();
            await this.testMdl.findByIdAndUpdate(_deletedQuestion.testId, {$pull: {questions: _deletedQuestion._id}})
            return _deletedQuestion;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async createAnswer(dto: CreateAnswerDTO) {
        try {
            console.log(dto);
            let oldQuestion = await this.qstMdl.findByIdAndUpdate(dto.questionId, {$push: {answers: dto}});
            if (!oldQuestion) throw new ExcNotFound();
            let updatedQuestion = await this.qstMdl.findById(oldQuestion._id);
            return updatedQuestion;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async editAnswer(dto: EditAnswerDTO) {
        try {
            let oldQuestion = await this.qstMdl.findById(dto.questionId);
            if (!oldQuestion) throw new ExcNotFound();
            let oldAnswer = oldQuestion.answers.find(a => a._id.toString() === dto._id.toString());
            if (!oldAnswer) throw new ExcNotFound();
            
            let answerIndex = oldQuestion.answers.indexOf(oldAnswer);
    
            oldQuestion.answers[answerIndex] = dto;
    
            let question = await this.qstMdl.findByIdAndUpdate(dto.questionId, oldQuestion);
            let updatedQuestion = await this.qstMdl.findById(question._id);
            return updatedQuestion;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async deleteAnswer(questionId: string, answerId: string) {
        try {
            let oldQuestion = await this.qstMdl.findById(questionId);
            if (!oldQuestion) throw new ExcNotFound();
            let oldAnswer = oldQuestion.answers.find(a => a._id.toString() === answerId.toString());
            if (!oldAnswer) throw new ExcNotFound();
            let question = await this.qstMdl.findByIdAndUpdate(questionId, {$pull: {answers: {_id: answerId}}});
            await this.qstMdl.updateOne({result: answerId}, {result: null});
            let updatedQuestion = await this.qstMdl.findById(question._id);
            return updatedQuestion;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }
}