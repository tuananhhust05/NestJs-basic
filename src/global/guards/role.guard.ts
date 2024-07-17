import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ARole, User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { arrayUnique, isArrayEmpty, onlyWithin, subtractArray } from '../helpers/utilities.helper';
import { ExcForbidden, ExcUnauth } from '../models/exception.models';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private user$: UserService) {}
    async canActivate(context: ExecutionContext,): Promise<boolean> {
        const rolesHandler = this.reflector.get<ARole[]>('roles', context.getHandler())??[];
        const rolesClass = this.reflector.get<ARole[]>('roles', context.getClass())??[];
        const norolesHandler = this.reflector.get<ARole[]>('noroles', context.getHandler())??[];
        const norolesClass = this.reflector.get<ARole[]>('noroles', context.getClass())??[];
        const roles = arrayUnique([...rolesClass, ...rolesHandler]);
        const noroles = subtractArray(arrayUnique([...norolesClass, ...norolesHandler]), rolesHandler);
        if (isArrayEmpty(roles)&&isArrayEmpty(noroles)) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const _user = await this.getUserData(request);
        response.locals.user = _user;
        
        return await this.validateRole(_user, roles, noroles);
    }

    async validateRole(user: User, roles: string[], noroles: string[]): Promise<boolean> {
        if (onlyWithin(user.role, noroles)) throw new ExcForbidden();
        if (isArrayEmpty(roles)||onlyWithin(user.role, roles)) {
            return true;
        } else {
            throw new ExcForbidden();
        }
    }

    async getUserData(request: Request): Promise<User> {
        const _authHeader = request.headers['authorization'];
        if (_authHeader?.startsWith("Bearer ")){
            const _token = _authHeader.substring(7, _authHeader.length);
            return this.user$.getUserFromToken(_token);
        } else {
            throw new ExcUnauth();
        }
    }
}