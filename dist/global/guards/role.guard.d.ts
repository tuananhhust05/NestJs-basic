import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
export declare class RoleGuard implements CanActivate {
    private reflector;
    private user$;
    constructor(reflector: Reflector, user$: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    validateRole(user: User, roles: string[], noroles: string[]): Promise<boolean>;
    getUserData(request: Request): Promise<User>;
}
