import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { AttemptController } from './attempt/controllers/attempt.controller';
import { Attempt, AttemptSchema } from './attempt/schemas/attempt.schema';
import { AttemptService } from './attempt/services/attempt.service';
import { ResultController } from './result/result.controller';
import { ResultService } from './result/result.service';
import { Result, ResultSchema } from './result/schemas/result.schema';
import { SubjectController } from './subject/subject.controller';
import { Subject, SubjectSchema } from './subject/subject.schema';
import { SubjectService } from './subject/subject.service';
import { SubjectTypeController } from './subjectType/subject-type.controller';
import { SubjectType, SubjectTypeSchema } from './subjectType/subject-type.schema';
import { SubjectTypeService } from './subjectType/subject-type.service';
import { AnswerController } from './test/controllers/answer.controller';
import { QuestionController } from './test/controllers/question.controller';
import { TestController } from './test/controllers/test.controller';
import { Answer, AnswerSchema } from './test/schemas/answer.schema';
import { Question, QuestionSchema } from './test/schemas/question.schema';
import { Test, TestSchema } from './test/schemas/test.schema';
import { QuestionService } from './test/services/question.service';
import { TestService } from './test/services/test.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Question.name, schema: QuestionSchema},
            {name: Answer.name, schema: AnswerSchema},
            {name: Test.name, schema: TestSchema},
            {name: SubjectType.name, schema: SubjectTypeSchema},
            {name: Subject.name, schema: SubjectSchema},
            {name: Attempt.name, schema: AttemptSchema},
            {name: Result.name, schema: ResultSchema},
            {name: User.name, schema: UserSchema},
        ])
    ],
    providers: [
        QuestionService,
        TestService,
        SubjectService,
        SubjectTypeService,
        AttemptService,
        ResultService
    ],
    controllers: [
        QuestionController,
        AnswerController,
        TestController,
        SubjectController,
        SubjectTypeController,
        AttemptController,
        ResultController
    ]
})
export class MainModule {}
