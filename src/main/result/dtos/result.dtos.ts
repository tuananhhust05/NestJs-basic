import { Result } from "../schemas/result.schema";

export type CreateResultDTO = Omit<Result, "_id">

// export type EditUserDTO = Result;