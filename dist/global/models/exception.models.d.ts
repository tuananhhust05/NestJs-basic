import { HttpException, HttpStatus } from "@nestjs/common";
export declare class ApiException extends HttpException {
    constructor(status: HttpStatus, message: string, trace?: any);
}
export declare class ExcForbidden extends ApiException {
    constructor(trace?: any, message?: string);
}
export declare class ExcIntError extends ApiException {
    constructor(trace?: any, message?: string);
}
export declare class ExcUnauth extends ApiException {
    constructor(trace?: any, message?: string);
}
export declare class ExcBadRequest extends ApiException {
    constructor(trace?: any, message?: string);
}
export declare class ExcNotFound extends ApiException {
    constructor(trace?: any, message?: string);
}
export declare class ExcUnprEntity extends ApiException {
    constructor(trace?: any, reason?: string, message?: string);
    static queryExcFact(...queries: string[]): ExcUnprEntity;
    static fieldExcFact(...queries: string[]): ExcUnprEntity;
}
