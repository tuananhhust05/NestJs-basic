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
import { ChangeTestStatusDTO, CreateTestDTO, EditTestDTO } from "../dtos/test.dtos";
import { TestService } from "../services/test.service";
export declare class TestController {
    private test$;
    constructor(test$: TestService);
    getAllTests(skip?: number, limit?: number, subject?: string, subjectType?: string, isCount?: boolean): Promise<number | Omit<Omit<Omit<import("mongoose").Document<unknown, any, import("../schemas/test.schema").TestDocument> & import("../schemas/test.schema").Test & Document & Required<{
        _id: string;
    }>, never>, never>, never>[]>;
    getAllOpenTests(skip?: number, limit?: number, subject?: string, subjectType?: string, isCount?: boolean): Promise<number | Omit<Omit<import("mongoose").Document<unknown, any, import("../schemas/test.schema").TestDocument> & import("../schemas/test.schema").Test & Document & Required<{
        _id: string;
    }>, never>, never>[]>;
    getTestById(id: string): Promise<import("mongoose").Document<unknown, any, import("../schemas/test.schema").TestDocument> & import("../schemas/test.schema").Test & Document & Required<{
        _id: string;
    }>>;
    createTest(dto: CreateTestDTO): Promise<import("mongoose").Document<unknown, any, import("../schemas/test.schema").TestDocument> & import("../schemas/test.schema").Test & Document & Required<{
        _id: string;
    }>>;
    editTest(dto: EditTestDTO): Promise<import("mongoose").Document<unknown, any, import("../schemas/test.schema").TestDocument> & import("../schemas/test.schema").Test & Document & Required<{
        _id: string;
    }>>;
    changeTestStatus(dto: ChangeTestStatusDTO): Promise<import("mongoose").Document<unknown, any, import("../schemas/test.schema").TestDocument> & import("../schemas/test.schema").Test & Document & Required<{
        _id: string;
    }>>;
    deleteTest(id: string): Promise<import("mongoose").Document<unknown, any, import("../schemas/test.schema").TestDocument> & import("../schemas/test.schema").Test & Document & Required<{
        _id: string;
    }>>;
}
