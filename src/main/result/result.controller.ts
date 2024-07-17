import { Controller, Get, Param, Query } from "@nestjs/common";
import { Roles } from "src/global/decorators/role.decorator";
import { AuthUser } from "src/global/decorators/user.decorator";
import { ARole, User } from "src/user/schemas/user.schema";
import { ResultService } from "./result.service";

@Controller("result")
@Roles(ARole.admin)
export class ResultController {

    constructor(private result$: ResultService) {}

    @Get("all")
    async getAllResults(@Query("isCount") isCount?: boolean) {
        return await this.result$.getAllResults();
    }

    @Get("my")
    @Roles(ARole.student)
    async getMyResult(@AuthUser() user: User, @Query("isCount") isCount?: boolean) {
        return await this.result$.getMyResults(user);
    }

    @Get("test/:id")
    async getResultByTestId(@Param("id") id: string) {
        return await this.result$.getResultByTestId(id);
    } 

    @Get(":id")
    @Roles(ARole.student)
    async getResultById(@Param("id") id: string) {
        return await this.result$.getResultById(id);
    }

}