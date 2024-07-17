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
import { User, UserDocument } from "src/user/schemas/user.schema";
import { Attempt, AttemptDocument } from "../attempt/schemas/attempt.schema";
import { TestDocument } from "../test/schemas/test.schema";
import { Result, ResultDocument } from "./schemas/result.schema";
export declare class ResultService {
    private resultMdl;
    private attemptMdl;
    private testMdl;
    private userMdl;
    constructor(resultMdl: Model<ResultDocument>, attemptMdl: Model<AttemptDocument>, testMdl: Model<TestDocument>, userMdl: Model<UserDocument>);
    createResult(attempt: Attempt): Promise<import("mongoose").Document<unknown, any, ResultDocument> & Result & Document & Required<{
        _id: string;
    }>>;
    getAllResults(isCount?: boolean): Promise<number | Omit<Omit<import("mongoose").Document<unknown, any, ResultDocument> & Result & Document & Required<{
        _id: string;
    }>, never>, never>[]>;
    getResultById(id: string): Promise<import("mongoose").Document<unknown, any, ResultDocument> & Result & Document & Required<{
        _id: string;
    }>>;
    getResultByAttempt(id: string): Promise<import("mongoose").Document<unknown, any, ResultDocument> & Result & Document & Required<{
        _id: string;
    }>>;
    getMyResults(user: User, isCount?: boolean): Promise<number | Omit<Omit<import("mongoose").Document<unknown, any, ResultDocument> & Result & Document & Required<{
        _id: string;
    }>, never>, never>[]>;
    getResultByTestId(id: string): Promise<Omit<Omit<import("mongoose").Document<unknown, any, ResultDocument> & Result & Document & Required<{
        _id: string;
    }>, never>, never>[]>;
}
