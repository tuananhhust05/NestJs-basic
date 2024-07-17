import { FileRecord } from "../schemas/file-record.schema";
export declare type FileUploadDTO = Omit<FileRecord, "filename" | "_id">;
