import { Body, Controller, Delete, Get, Patch, Post, Query, SetMetadata } from "@nestjs/common";
import { BodyWithout } from "src/global/decorators/body-without.decorator";
import { NoRoles, Roles } from "src/global/decorators/role.decorator";
import { AuthUser } from "src/global/decorators/user.decorator";
import { ExcIntError } from "src/global/models/exception.models";
import { ARole } from "./schemas/user.schema";
import { ChangeMyPasswordDTO, ChangeUserPasswordDTO, CreateFirebaseUserDTO, EditProfileDTO, EditUserDTO } from "./user.dtos";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private user$: UserService) {}
    @Get('')
    @Roles(ARole.student, ARole.admin)
    async getUser(@AuthUser() user) {
      try {
        return this.user$.getPopulatedUser(user._id.toString());
      } catch (err) {
        throw new ExcIntError(err);
      }
    }
    @Get('')
    @Roles(ARole.admin)
    async getUserById(@Query("id") id: string) {
      return await this.getUserById(id);
    }
    @Get('all')
    @Roles(ARole.admin)
    async getAllUser() {
      return await this.user$.getAllUser();
    }
    @Post('')
    @Roles(ARole.admin)
    async createUser(@Body() dto: CreateFirebaseUserDTO) {
      return await this.user$.createFirebaseUser(dto);
    }
    @Patch('myprofile')
    @Roles(ARole.student, ARole.admin)
    async editMyProfile(@AuthUser() user, @BodyWithout(["_id", "attempt", "accountType"]) dto: EditProfileDTO) {
      dto._id = user._id;
      return await this.user$.editUser(dto);
    }
    @Patch('mypassword')
    @Roles(ARole.student, ARole.admin)
    async changeMyPassword(@AuthUser() user, @Body() dto: ChangeMyPasswordDTO) {
      
      return await this.user$.changeUserPassword(user.userId, dto.password);
    }
    @Patch('')
    @Roles(ARole.admin)
    async editUser(@BodyWithout() dto: EditUserDTO) {
      return await this.user$.editUser(dto);
    }
    @Patch('password')
    @Roles(ARole.admin)
    async changeUserPassword(@Body() dto: ChangeUserPasswordDTO) {
      return await this.user$.changeUserPassword(dto.uid, dto.password);
    }
    @Delete('')
    @Roles(ARole.admin)
    async deleteUser(@Query("id") id: string) {
      return await this.user$.deleteUser(id);
    }
}