import { SubjectType } from "./subject-type.schema";

export type CreateSubjectTypeDTO = Omit<SubjectType, "_id">

export type EditSubjectTypeDTO = SubjectType;