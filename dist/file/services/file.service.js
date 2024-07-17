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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const file_record_schema_1 = require("../schemas/file-record.schema");
const mongoose_2 = require("mongoose");
const sharp = require("sharp");
const exception_models_1 = require("../../global/models/exception.models");
const fs = require("fs/promises");
const path_1 = require("path");
let FileService = class FileService {
    constructor(fileRecordModel) {
        this.fileRecordModel = fileRecordModel;
    }
    async _resizeAndSaveImage(file, filename) {
        try {
            const acceptedExts = [".jpg", ".png", ".jpeg", ".gif", ".bmp", ".tif", ".tiff"];
            const fileExt = (0, path_1.extname)(file.originalname);
            let isAccepted = false;
            for (let i = 0; i < acceptedExts.length; i++) {
                if (fileExt == acceptedExts[i]) {
                    isAccepted = true;
                    break;
                }
            }
            if (!isAccepted)
                throw new exception_models_1.ExcUnprEntity(undefined, "Chỉ chấp nhận .jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff");
            await sharp(file.buffer).resize(1024, 1024, {
                fit: 'inside',
            })
                .toFormat("webp")
                .webp({ quality: 90 })
                .toFile((0, path_1.join)(process.cwd(), process.env.UPLOAD_PATH, filename));
        }
        catch (error) {
            console.log(error);
            throw new exception_models_1.ExcIntError(error);
        }
    }
    async _saveUploadedFile(file) {
        try {
            const fileExt = (0, path_1.extname)(file.originalname);
            const filename = `${Date.now()}-file${fileExt}`;
            await fs.writeFile((0, path_1.join)(process.cwd(), process.env.UPLOAD_PATH, filename), file.buffer);
            return filename;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async _deleteFile(filename) {
        try {
            await fs.unlink((0, path_1.join)(process.cwd(), process.env.UPLOAD_PATH, filename));
        }
        catch (error) {
            throw new exception_models_1.ExcIntError(error);
        }
    }
    async saveUploadedImage(file, permission = file_record_schema_1.FileRecordPermission.public, productID = undefined) {
        try {
            const filename = `${Date.now()}-image.webp`;
            await this._resizeAndSaveImage(file, filename);
            let savedRecord = await (new this.fileRecordModel({
                filename: filename,
                permission: permission,
                type: file_record_schema_1.FileRecordType.image,
                productId: productID
            })).save();
            return savedRecord;
        }
        catch (error) {
            console.log(error);
            throw new exception_models_1.ExcIntError(error);
        }
    }
    async saveUploadedImages(files, permission = file_record_schema_1.FileRecordPermission.public, productID = undefined) {
        try {
            let promises = [];
            for (let i = 0; i < files.length; i++) {
                const _file = files[i];
                const _promise = this.saveUploadedImage(_file, permission, productID);
                promises.push(_promise);
            }
            let results = await Promise.all(promises);
            return results;
        }
        catch (error) {
            throw new exception_models_1.ExcIntError(error);
        }
    }
    async deleteFile(id) {
        try {
            const record = await this.fileRecordModel.findByIdAndRemove(id);
            await this._deleteFile(record.filename);
            return record;
        }
        catch (error) {
            throw new exception_models_1.ExcIntError(error);
        }
    }
    async deleteFiles(ids) {
        try {
            let results = [];
            for (let i = 0; i < ids.length; i++) {
                const _id = ids[i];
                const _record = await this.deleteFile(_id);
                results.push(_record);
            }
            return results;
        }
        catch (error) {
            throw new exception_models_1.ExcIntError(error);
        }
    }
    async getFileList() {
        try {
            return await this.fileRecordModel.find();
        }
        catch (error) {
            throw new exception_models_1.ExcIntError(error);
        }
    }
    async getFileFromName(filename) {
        try {
            return await this.fileRecordModel.findOne({ filename: filename });
        }
        catch (error) {
            throw new exception_models_1.ExcIntError(error);
        }
    }
    async serveStaticFile(res, name) {
        try {
            const record = await this.fileRecordModel.findOne({
                filename: name
            });
            if (record) {
                res.sendFile((0, path_1.join)(process.cwd(), process.env.UPLOAD_PATH, record.filename));
            }
            else {
                throw new exception_models_1.ExcNotFound();
            }
        }
        catch (error) {
            throw new exception_models_1.ExcIntError(error);
        }
    }
    async replaceFile(oldFile, newFile) {
        const _oldRecord = await this.getFileFromName(oldFile);
        if (_oldRecord) {
            try {
                await this.deleteFile(_oldRecord._id);
            }
            catch (error) {
                console.log(error);
            }
        }
        return await this.saveUploadedImage(newFile);
    }
    async saveUploadedFile(file, type, permission = file_record_schema_1.FileRecordPermission.public, productID = undefined) {
        try {
            const filename = await this._saveUploadedFile(file);
            let savedRecord = await (new this.fileRecordModel({
                filename: filename,
                permission: permission,
                type: type,
                productId: productID
            })).save();
            return savedRecord;
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async saveUploadedFiles(files, type, permission = file_record_schema_1.FileRecordPermission.public, productID = undefined) {
        try {
            let results = [];
            for (let i = 0; i < files.length; i++) {
                const _file = files[i];
                const _record = await this.saveUploadedFile(_file, file_record_schema_1.FileRecordType.file, permission, productID);
                results.push(_record);
            }
            return results;
        }
        catch (error) {
            throw new exception_models_1.ExcIntError(error);
        }
    }
    async getAllFileRecords() {
        try {
            return await this.fileRecordModel.find();
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async deleteFileWithName(filename) {
        try {
            let record = await this.getFileFromName(filename);
            if (!record) {
                throw new Error("File not found");
            }
            return await this.deleteFile(record._id);
        }
        catch (err) {
            console.log("File not found: ", filename);
        }
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_record_schema_1.FileRecord.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map