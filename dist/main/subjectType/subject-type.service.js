"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectTypeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const exception_models_1 = require("../../global/models/exception.models");
const subject_schema_1 = require("../subject/subject.schema");
const subject_type_schema_1 = require("./subject-type.schema");
let SubjectTypeService = class SubjectTypeService {
    constructor(sjtMdl, sbjMdl) {
        this.sjtMdl = sjtMdl;
        this.sbjMdl = sbjMdl;
    }
    async getAll() {
        try {
            let records = await this.sjtMdl.find();
            return records;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getById(id) {
        try {
            let record = await this.sjtMdl.findById(id);
            if (!record)
                throw new exception_models_1.ExcNotFound();
            return record;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getBySubject(subjectId) {
        try {
            let records = await this.sjtMdl.find({ subjectId: subjectId });
            return records;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async create(dto) {
        try {
            let subject = await this.sbjMdl.findById(dto.subjectId);
            if (!subject)
                throw new exception_models_1.ExcBadRequest();
            let savedRecord = await (new this.sjtMdl(dto)).save();
            return savedRecord;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async edit(dto) {
        try {
            if (dto.subjectId) {
                let subject = await this.sbjMdl.findById(dto.subjectId);
                if (!subject)
                    throw new exception_models_1.ExcBadRequest();
            }
            let oldRecord = await this.sjtMdl.findByIdAndUpdate(dto._id, dto);
            if (!oldRecord)
                throw new exception_models_1.ExcNotFound();
            let updatedRecord = await this.sjtMdl.findById(oldRecord._id);
            return updatedRecord;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async delete(id) {
        try {
            let deletedRecord = await this.sjtMdl.findByIdAndDelete(id);
            if (!deletedRecord)
                throw new exception_models_1.ExcNotFound();
            return deletedRecord;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
};
SubjectTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subject_type_schema_1.SubjectType.name)),
    __param(1, (0, mongoose_1.InjectModel)(subject_schema_1.Subject.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SubjectTypeService);
exports.SubjectTypeService = SubjectTypeService;
//# sourceMappingURL=subject-type.service.js.map