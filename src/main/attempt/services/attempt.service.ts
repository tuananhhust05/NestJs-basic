import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Subject } from "rxjs";
import { shuffleArray } from "src/global/helpers/utilities.helper";
import { ExcBadRequest, ExcIntError, ExcNotFound } from "src/global/models/exception.models";
import { ResultService } from "src/main/result/result.service";
import { Test, TestDocument } from "src/main/test/schemas/test.schema";
import { User, UserDocument } from "src/user/schemas/user.schema";
import { CreateAttemptDTO, StartAttemptDTO, UpdateAttemptDTO } from "../dtos/attempt.dtos";
import { AttemptQuestion } from "../schemas/attempt-question.schema";
import { Attempt, AttemptDocument } from "../schemas/attempt.schema";

@Injectable()

export class AttemptService {
    interval: any;
    timerSubject: Subject<void> = new Subject();
    timerObservable = this.timerSubject.asObservable();
    constructor (
        @InjectModel(Attempt.name) private attemptMdl: Model<AttemptDocument>,
        @InjectModel(Test.name) private testMdl: Model<TestDocument>,
        @InjectModel(User.name) private userMdl: Model<UserDocument>,
        private result$: ResultService
        ) {
            this.interval = setInterval(()=>{
                this.timerSubject.next();
            }, 1000)
        }

    async startAttempt(dto: StartAttemptDTO, user: User) {
        try {
            if (user.attempt) {
                throw new ExcBadRequest(null, "Bạn không thể làm nhiều bài thi cùng lúc!")
            }
            let _test = await this.testMdl.findById(dto.testId).populate("questions");
            if (!_test) throw new ExcNotFound(null, "Bài thi không tồn tại!");
            // let questions = shuffleArray([..._test.questions]);
            let questions = [..._test.questions];
            let attemptQuestions = [];
            questions.forEach(question=>{
                let attemptQuestion: AttemptQuestion = {
                    defId: question._id,
                    // answers: shuffleArray([...question.answers].map(data => ({...data, defId: data._id}))),
                    answers: [...question.answers].map(data => ({...data, defId: data._id})),
                    content: question.content
                }
                attemptQuestions.push(attemptQuestion);
            })
            
            let createAttemptDTO: CreateAttemptDTO = {
                answers: [].fill(0, attemptQuestions.length-1, null),
                questions: attemptQuestions,
                startTime: new Date(),
                endTime: new Date(Date.now() + _test.testDuration*1000*60),
                testId: _test._id as unknown as Test,
                user: user._id as unknown as User,
                subject: _test.subject,
                subjectType: _test.subjectType,
                testDuration: _test.testDuration,
                testFormality: _test.testFormality,
                title: _test.title,
                type: _test.type,
            }
            let savedAttempt = await (new this.attemptMdl(createAttemptDTO)).save();
            await this.userMdl.findByIdAndUpdate(user._id, {attempt: savedAttempt._id})
            let _subscription = this.timerObservable.subscribe(()=> {
                if (Date.now() >= savedAttempt.endTime.getTime()) {
                    _subscription.unsubscribe();
                    this.userMdl.findById(user._id).then((_user) => {
                        this.submitAttempt(_user).then(()=>{
                            console.log(`[INFO]:User ${_user._id} timed out!`)
                        })
                    })
                }
            })
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async submitAttempt(user: User) {
        try {
            if (!user.attempt) {
                throw new ExcBadRequest();
            }
            let attempt = await this.attemptMdl.findById(user.attempt);
            let result = await this.result$.createResult(attempt);
            await this.userMdl.findByIdAndUpdate(user._id, {attempt: null});
            return result;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async updateAttempt(dto: UpdateAttemptDTO, user: User) {
        try {
            if (!user.attempt) {
                throw new ExcBadRequest();
            }
            let oldAttempt = await this.attemptMdl.findByIdAndUpdate(user.attempt, {answers: dto.answers});
            let attempt = await this.attemptMdl.findById(oldAttempt._id);
            return attempt;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }
    async getResult(id: string) {
        return this.result$.getResultByAttempt(id)
    }
}