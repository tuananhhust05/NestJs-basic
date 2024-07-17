/// <reference types="multer" />
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
/// <reference types="mongoose/types/inferschematype" />
import { FileRecord, FileRecordDocument, FileRecordPermission, FileRecordType } from "../schemas/file-record.schema";
import { Model } from "mongoose";
import { Response } from "express";
export declare class FileService {
    private fileRecordModel;
    constructor(fileRecordModel: Model<FileRecordDocument>);
    private _resizeAndSaveImage;
    private _saveUploadedFile;
    private _deleteFile;
    saveUploadedImage(file: Express.Multer.File, permission?: FileRecordPermission, productID?: any): Promise<FileRecord>;
    saveUploadedImages(files: Express.Multer.File[], permission?: FileRecordPermission, productID?: any): Promise<FileRecord[]>;
    deleteFile(id: string): Promise<FileRecord>;
    deleteFiles(ids: string[]): Promise<FileRecord[]>;
    getFileList(): Promise<FileRecord[]>;
    getFileFromName(filename: any): Promise<FileRecord | null>;
    serveStaticFile(res: Response, name: string): Promise<void>;
    replaceFile(oldFile: string, newFile: Express.Multer.File): Promise<FileRecord>;
    saveUploadedFile(file: Express.Multer.File, type: FileRecordType, permission?: FileRecordPermission, productID?: any): Promise<FileRecord>;
    saveUploadedFiles(files: Express.Multer.File[], type: FileRecordType, permission?: FileRecordPermission, productID?: any): Promise<FileRecord[]>;
    getAllFileRecords(): Promise<(FileRecord & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    deleteFileWithName(filename: any): Promise<FileRecord>;
}
