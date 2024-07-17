import { SetMetadata } from '@nestjs/common';
import { ARole } from 'src/user/schemas/user.schema';

export const Roles = (...roles: ARole[]) => SetMetadata('roles', roles);

export const NoRoles = (...roles: ARole[]) => SetMetadata('noroles', roles);