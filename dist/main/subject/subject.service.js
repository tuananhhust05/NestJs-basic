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
exports.SubjectService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const exception_models_1 = require("../../global/models/exception.models");
const subject_type_schema_1 = require("../subjectType/subject-type.schema");
const subject_schema_1 = require("./subject.schema");
let SubjectService = class SubjectService {
    constructor(sjtMdl, sbjMdl) {
        this.sjtMdl = sjtMdl;
        this.sbjMdl = sbjMdl;
    }
    async getAll() {
        try {
            let records = await this.sbjMdl.find();
            return records;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async getById(id) {
        try {
            let record = await this.sbjMdl.findById(id);
            if (!record)
                throw new exception_models_1.ExcNotFound();
            return record;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async create(dto) {
        try {
            let savedRecord = await (new this.sbjMdl(dto)).save();
            return savedRecord;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async edit(dto) {
        try {
            let oldRecord = await this.sbjMdl.findByIdAndUpdate(dto._id, dto);
            if (!oldRecord)
                throw new exception_models_1.ExcNotFound();
            let updatedRecord = await this.sbjMdl.findById(oldRecord._id);
            return updatedRecord;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async delete(id) {
        try {
            let deletedRecord = await this.sbjMdl.findByIdAndDelete(id);
            if (!deletedRecord)
                throw new exception_models_1.ExcNotFound();
            await this.sjtMdl.deleteMany({ subjectId: deletedRecord._id });
            return deletedRecord;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
};
SubjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subject_type_schema_1.SubjectType.name)),
    __param(1, (0, mongoose_1.InjectModel)(subject_schema_1.Subject.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SubjectService);
exports.SubjectService = SubjectService;
//# sourceMappingURL=subject.service.js.map