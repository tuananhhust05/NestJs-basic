"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyWithout = void 0;
const common_1 = require("@nestjs/common");
exports.BodyWithout = (0, common_1.createParamDecorator)((stripFields = [], ctx) => {
    const request = ctx.switchToHttp().getRequest();
    let body = request.body;
    stripFields.forEach(field => {
        body[field] = undefined;
    });
    return body;
});
//# sourceMappingURL=body-without.decorator.js.map