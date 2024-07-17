"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcUnprEntity = exports.ExcNotFound = exports.ExcBadRequest = exports.ExcUnauth = exports.ExcIntError = exports.ExcForbidden = exports.ApiException = void 0;
const common_1 = require("@nestjs/common");
class ApiException extends common_1.HttpException {
    constructor(status, message, trace) {
        console.log(trace);
        if (trace) {
            super({
                status: status,
                error: message,
                stackTrace: trace
            }, status);
        }
        else {
            super({
                status: status,
                error: message,
            }, status);
        }
    }
}
exports.ApiException = ApiException;
class ExcForbidden extends ApiException {
    constructor(trace, message = "Bạn không có quyền truy cập tài nguyên này!") {
        super(common_1.HttpStatus.FORBIDDEN, message, trace);
    }
}
exports.ExcForbidden = ExcForbidden;
class ExcIntError extends ApiException {
    constructor(trace, message = "Lỗi máy chủ!") {
        super(common_1.HttpStatus.INTERNAL_SERVER_ERROR, message, trace);
        if (trace.status) {
            throw trace;
        }
    }
}
exports.ExcIntError = ExcIntError;
class ExcUnauth extends ApiException {
    constructor(trace, message = "Tài nguyên yêu cầu Authorization!") {
        super(common_1.HttpStatus.UNAUTHORIZED, message, trace);
    }
}
exports.ExcUnauth = ExcUnauth;
class ExcBadRequest extends ApiException {
    constructor(trace, message = "Bad request!") {
        super(common_1.HttpStatus.BAD_REQUEST, message, trace);
    }
}
exports.ExcBadRequest = ExcBadRequest;
class ExcNotFound extends ApiException {
    constructor(trace, message = "Tài nguyên không tồn tại!") {
        super(common_1.HttpStatus.NOT_FOUND, message, trace);
    }
}
exports.ExcNotFound = ExcNotFound;
class ExcUnprEntity extends ApiException {
    constructor(trace, reason, message = "Dữ liệu gửi không hợp lệ!") {
        super(common_1.HttpStatus.UNPROCESSABLE_ENTITY, message + "( " + reason + " )", trace);
    }
    static queryExcFact(...queries) {
        return new ExcUnprEntity(undefined, "Thiếu query " + queries.join(", "));
    }
    static fieldExcFact(...queries) {
        return new ExcUnprEntity(undefined, "Thiếu field " + queries.join(", "));
    }
}
exports.ExcUnprEntity = ExcUnprEntity;
//# sourceMappingURL=exception.models.js.map