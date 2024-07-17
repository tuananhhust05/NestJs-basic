import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExcIntError, ExcNotFound } from "src/global/models/exception.models";
import { SubjectType, SubjectTypeDocument } from "../subjectType/subject-type.schema";
import { CreateSubjectDTO, EditSubjectDTO } from "./subject.dtos";
import { Subject, SubjectDocument } from "./subject.schema";

@Injectable()

export class SubjectService {
    constructor (
        @InjectModel(SubjectType.name) private sjtMdl: Model<SubjectTypeDocument>,
        @InjectModel(Subject.name) private sbjMdl: Model<SubjectDocument>
        ) {}

    async getAll() {
        try {
            let records = await this.sbjMdl.find();
            return records;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async getById(id: string) {
        try {
            let record = await this.sbjMdl.findById(id);
            if (!record) throw new ExcNotFound();
            return record;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async create(dto: CreateSubjectDTO) {
        try {
            let savedRecord = await (new this.sbjMdl(dto)).save();
            return savedRecord;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async edit(dto: EditSubjectDTO) {
        try {
            let oldRecord = await this.sbjMdl.findByIdAndUpdate(dto._id, dto);
            if (!oldRecord) throw new ExcNotFound();
            let updatedRecord = await this.sbjMdl.findById(oldRecord._id);
            return updatedRecord;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async delete(id: string) {
        try {
            let deletedRecord = await this.sbjMdl.findByIdAndDelete(id);
            if (!deletedRecord) throw new ExcNotFound();
            await this.sjtMdl.deleteMany({subjectId: deletedRecord._id});
            return deletedRecord;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }
    
}