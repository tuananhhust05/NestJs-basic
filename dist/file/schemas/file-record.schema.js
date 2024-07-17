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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRecordSchema = exports.FileRecord = exports.FileRecordType = exports.FileRecordPermission = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var FileRecordPermission;
(function (FileRecordPermission) {
    FileRecordPermission["public"] = "public";
    FileRecordPermission["private"] = "private";
})(FileRecordPermission = exports.FileRecordPermission || (exports.FileRecordPermission = {}));
var FileRecordType;
(function (FileRecordType) {
    FileRecordType["video"] = "video";
    FileRecordType["image"] = "image";
    FileRecordType["file"] = "file";
})(FileRecordType = exports.FileRecordType || (exports.FileRecordType = {}));
let FileRecord = class FileRecord {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FileRecord.prototype, "filename", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], FileRecord.prototype, "permission", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], FileRecord.prototype, "type", void 0);
FileRecord = __decorate([
    (0, mongoose_1.Schema)({ collection: "filerecords" })
], FileRecord);
exports.FileRecord = FileRecord;
exports.FileRecordSchema = mongoose_1.SchemaFactory.createForClass(FileRecord);
//# sourceMappingURL=file-record.schema.js.map