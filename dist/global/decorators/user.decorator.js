"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const common_1 = require("@nestjs/common");
exports.AuthUser = (0, common_1.createParamDecorator)((stripFields = [], ctx) => {
    var _a;
    const response = ctx.switchToHttp().getResponse();
    return (_a = response.locals.user) !== null && _a !== void 0 ? _a : null;
});
//# sourceMappingURL=user.decorator.js.map