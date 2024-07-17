import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExcBadRequest, ExcIntError, ExcNotFound, ExcUnprEntity } from "src/global/models/exception.models";
import { Subject, SubjectDocument } from "../subject/subject.schema";
import { CreateSubjectTypeDTO, EditSubjectTypeDTO } from "./subject-type.dtos";
import { SubjectType, SubjectTypeDocument } from "./subject-type.schema";

@Injectable()

export class SubjectTypeService {
    constructor (
        @InjectModel(SubjectType.name) private sjtMdl: Model<SubjectTypeDocument>,
        @InjectModel(Subject.name) private sbjMdl: Model<SubjectDocument>
        ) {}

    async getAll() {
        try {
            let records = await this.sjtMdl.find();
            return records;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async getById(id: string) {
        try {
            let record = await this.sjtMdl.findById(id);
            if (!record) throw new ExcNotFound();
            return record;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async getBySubject(subjectId: string) {
        try {
            let records = await this.sjtMdl.find({subjectId: subjectId});
            return records;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async create(dto: CreateSubjectTypeDTO) {
        try {
            let subject = await this.sbjMdl.findById(dto.subjectId)
            if (!subject) throw new ExcBadRequest()
            let savedRecord = await (new this.sjtMdl(dto)).save();
            return savedRecord;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async edit(dto: EditSubjectTypeDTO) {
        try {
            if (dto.subjectId) {
                let subject = await this.sbjMdl.findById(dto.subjectId)
                if (!subject) throw new ExcBadRequest()
            }
            let oldRecord = await this.sjtMdl.findByIdAndUpdate(dto._id, dto);
            if (!oldRecord) throw new ExcNotFound();
            let updatedRecord = await this.sjtMdl.findById(oldRecord._id);
            return updatedRecord;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async delete(id: string) {
        try {
            let deletedRecord = await this.sjtMdl.findByIdAndDelete(id);
            if (!deletedRecord) throw new ExcNotFound();
            return deletedRecord;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }
    
}