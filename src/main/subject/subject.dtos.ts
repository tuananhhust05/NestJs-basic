import { Subject } from "./subject.schema";

export type CreateSubjectDTO = Omit<Subject, "_id">

export type EditSubjectDTO = Subject;