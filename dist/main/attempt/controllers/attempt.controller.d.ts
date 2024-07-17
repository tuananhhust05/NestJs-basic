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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { User } from "src/user/schemas/user.schema";
import { StartAttemptDTO, UpdateAttemptDTO } from "../dtos/attempt.dtos";
import { AttemptService } from "../services/attempt.service";
export declare class AttemptController {
    private attempt$;
    constructor(attempt$: AttemptService);
    startAttempt(dto: StartAttemptDTO, user: User): Promise<void>;
    updateAttempt(dto: UpdateAttemptDTO, user: User): Promise<import("mongoose").Document<unknown, any, import("../schemas/attempt.schema").AttemptDocument> & import("../schemas/attempt.schema").Attempt & Document & Required<{
        _id: string;
    }>>;
    submitAttempt(user: User): Promise<import("mongoose").Document<unknown, any, import("../../result/schemas/result.schema").ResultDocument> & import("../../result/schemas/result.schema").Result & Document & Required<{
        _id: string;
    }>>;
    getResult(id: any): Promise<import("mongoose").Document<unknown, any, import("../../result/schemas/result.schema").ResultDocument> & import("../../result/schemas/result.schema").Result & Document & Required<{
        _id: string;
    }>>;
}
