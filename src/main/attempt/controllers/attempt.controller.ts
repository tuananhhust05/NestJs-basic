import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { Roles } from "src/global/decorators/role.decorator";
import { AuthUser } from "src/global/decorators/user.decorator";
import { ARole, User } from "src/user/schemas/user.schema";
import { StartAttemptDTO, UpdateAttemptDTO } from "../dtos/attempt.dtos";
import { AttemptService } from "../services/attempt.service";

@Controller("attempt")
@Roles(ARole.admin, ARole.student)
export class AttemptController {

    constructor(private attempt$: AttemptService) {}

    @Post("")
    async startAttempt(@Body() dto: StartAttemptDTO, @AuthUser() user: User) {
        return await this.attempt$.startAttempt(dto, user);
    }

    @Patch("")
    async updateAttempt(@Body() dto: UpdateAttemptDTO, @AuthUser() user: User) {
        return await this.attempt$.updateAttempt(dto, user);
    }

    @Post("submit")
    async submitAttempt(@AuthUser() user: User) {
        return await this.attempt$.submitAttempt(user);
    }

    @Get("result")
    async getResult(@Query("id") id) {
        return await this.attempt$.getResult(id);
    }
}