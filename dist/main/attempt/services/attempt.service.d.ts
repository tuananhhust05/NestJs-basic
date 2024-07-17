/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { Subject } from "rxjs";
import { ResultService } from "src/main/result/result.service";
import { TestDocument } from "src/main/test/schemas/test.schema";
import { User, UserDocument } from "src/user/schemas/user.schema";
import { StartAttemptDTO, UpdateAttemptDTO } from "../dtos/attempt.dtos";
import { Attempt, AttemptDocument } from "../schemas/attempt.schema";
export declare class AttemptService {
    private attemptMdl;
    private testMdl;
    private userMdl;
    private result$;
    interval: any;
    timerSubject: Subject<void>;
    timerObservable: import("rxjs").Observable<void>;
    constructor(attemptMdl: Model<AttemptDocument>, testMdl: Model<TestDocument>, userMdl: Model<UserDocument>, result$: ResultService);
    startAttempt(dto: StartAttemptDTO, user: User): Promise<void>;
    submitAttempt(user: User): Promise<import("mongoose").Document<unknown, any, import("../../result/schemas/result.schema").ResultDocument> & import("../../result/schemas/result.schema").Result & Document & Required<{
        _id: string;
    }>>;
    updateAttempt(dto: UpdateAttemptDTO, user: User): Promise<import("mongoose").Document<unknown, any, AttemptDocument> & Attempt & Document & Required<{
        _id: string;
    }>>;
    getResult(id: string): Promise<import("mongoose").Document<unknown, any, import("../../result/schemas/result.schema").ResultDocument> & import("../../result/schemas/result.schema").Result & Document & Required<{
        _id: string;
    }>>;
}
