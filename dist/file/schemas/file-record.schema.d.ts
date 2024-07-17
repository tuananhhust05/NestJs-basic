import { Document } from "mongoose";
import * as mongoose from "mongoose";
export declare enum FileRecordPermission {
    public = "public",
    private = "private"
}
export declare enum FileRecordType {
    video = "video",
    image = "image",
    file = "file"
}
export declare type FileRecordDocument = FileRecord & Document;
export declare class FileRecord {
    _id: string;
    filename: string;
    permission: FileRecordPermission;
    type: FileRecordType;
}
export declare let FileRecordSchema: mongoose.Schema<FileRecord, mongoose.Model<FileRecord, any, any, any, any>, {}, {}, {}, {}, "type", FileRecord>;
