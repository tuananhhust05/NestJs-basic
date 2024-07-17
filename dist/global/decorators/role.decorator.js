"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoRoles = exports.Roles = void 0;
const common_1 = require("@nestjs/common");
const Roles = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.Roles = Roles;
const NoRoles = (...roles) => (0, common_1.SetMetadata)('noroles', roles);
exports.NoRoles = NoRoles;
//# sourceMappingURL=role.decorator.js.map