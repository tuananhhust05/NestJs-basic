import { ARole } from 'src/user/schemas/user.schema';
export declare const Roles: (...roles: ARole[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const NoRoles: (...roles: ARole[]) => import("@nestjs/common").CustomDecorator<string>;
