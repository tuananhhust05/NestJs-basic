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
import { CreateSubjectDTO, EditSubjectDTO } from "./subject.dtos";
import { SubjectService } from "./subject.service";
export declare class SubjectController {
    private sbj$;
    constructor(sbj$: SubjectService);
    getAll(): Promise<(import("mongoose").Document<unknown, any, import("./subject.schema").SubjectDocument> & import("./subject.schema").Subject & Document & Required<{
        _id: string;
    }>)[]>;
    getById(id: string): Promise<import("mongoose").Document<unknown, any, import("./subject.schema").SubjectDocument> & import("./subject.schema").Subject & Document & Required<{
        _id: string;
    }>>;
    create(dto: CreateSubjectDTO): Promise<import("mongoose").Document<unknown, any, import("./subject.schema").SubjectDocument> & import("./subject.schema").Subject & Document & Required<{
        _id: string;
    }>>;
    edit(dto: EditSubjectDTO): Promise<import("mongoose").Document<unknown, any, import("./subject.schema").SubjectDocument> & import("./subject.schema").Subject & Document & Required<{
        _id: string;
    }>>;
    delete(id: string): Promise<import("mongoose").Document<unknown, any, import("./subject.schema").SubjectDocument> & import("./subject.schema").Subject & Document & Required<{
        _id: string;
    }>>;
}
