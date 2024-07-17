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
exports.StaticController = exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const body_without_decorator_1 = require("../global/decorators/body-without.decorator");
const utilities_helper_1 = require("../global/helpers/utilities.helper");
const exception_models_1 = require("../global/models/exception.models");
const file_record_schema_1 = require("./schemas/file-record.schema");
const file_service_1 = require("./services/file.service");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async uploadFile(dto, files) {
        try {
            if ((0, utilities_helper_1.isArrayEmpty)(files.upload))
                throw new exception_models_1.ExcUnprEntity(undefined, "Không có file để upload trong trường upload");
            if (!dto.permission)
                dto.permission = file_record_schema_1.FileRecordPermission.public;
            if (!(0, utilities_helper_1.onlyWithin)(dto.permission, ["public", "private"]))
                throw new exception_models_1.ExcUnprEntity(undefined, "Trường permission chỉ chấp nhận 'public', 'private'");
            return await this.fileService.saveUploadedFiles(files.upload, dto.type, dto.permission);
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async uploadImages(dto, files) {
        try {
            if ((0, utilities_helper_1.isArrayEmpty)(files.upload))
                throw new exception_models_1.ExcUnprEntity(undefined, "Không có file để upload trong trường upload");
            if (!dto.permission)
                dto.permission = file_record_schema_1.FileRecordPermission.public;
            if (!(0, utilities_helper_1.onlyWithin)(dto.permission, ["public", "private"]))
                throw new exception_models_1.ExcUnprEntity(undefined, "Trường permission chỉ chấp nhận 'public', 'private'");
            return await this.fileService.saveUploadedImages(files.upload, dto.permission);
        }
        catch (err) {
            throw new exception_models_1.ExcIntError(err);
        }
    }
    async deleteFile(filename) {
        return await this.fileService.deleteFileWithName(filename);
    }
    async getFileList() {
        return await this.fileService.getAllFileRecords();
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "upload", maxCount: 99 }
    ])),
    __param(0, (0, body_without_decorator_1.BodyWithout)(["filename", "_id"])),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('upload/images'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "upload", maxCount: 99 }
    ])),
    __param(0, (0, body_without_decorator_1.BodyWithout)(["filename", "_id"])),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadImages", null);
__decorate([
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Query)("filename")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteFile", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFileList", null);
FileController = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
exports.FileController = FileController;
let StaticController = class StaticController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async getFile(res, params) {
        await this.fileService.serveStaticFile(res, params.name);
    }
};
__decorate([
    (0, common_1.Get)(":name"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StaticController.prototype, "getFile", null);
StaticController = __decorate([
    (0, common_1.Controller)('static'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], StaticController);
exports.StaticController = StaticController;
//# sourceMappingURL=file.controller.js.map