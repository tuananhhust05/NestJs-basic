import { Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { first } from "rxjs";
import { BodyWithout } from "src/global/decorators/body-without.decorator";
import { Roles } from "src/global/decorators/role.decorator";
import { ARole } from "src/user/schemas/user.schema";
import { ChangeTestStatusDTO, CreateTestDTO, EditTestDTO } from "../dtos/test.dtos";
import { TestService } from "../services/test.service";

@Controller("test")
@Roles(ARole.admin)
export class TestController {
    constructor(private test$: TestService) {}

    @Get("all")
    async getAllTests(
        @Query("skip") skip?: number,
        @Query("limit") limit ?:number,
        @Query("subject") subject?:string,
        @Query("subjectType") subjectType?:string,
        @Query("isCount") isCount?: boolean
        ) {
        return await this.test$.getAllTests(skip, limit, subject, subjectType, isCount);
    }

    @Get("open")
    @Roles(ARole.student)
    async getAllOpenTests(
        @Query("skip") skip?: number,
        @Query("limit") limit ?:number,
        @Query("subject") subject?:string,
        @Query("subjectType") subjectType?:string,
        @Query("isCount") isCount?: boolean
    ) {
        return await this.test$.getAllOpenTests(skip, limit, subject, subjectType, isCount);
    }

    @Get(":id")
    @Roles(ARole.student)
    async getTestById(@Param("id") id: string) {
        return await this.test$.getTestById(id);
    }

    @Post("")
    async createTest(@BodyWithout(["_id", "questions"]) dto: CreateTestDTO) {
        return await this.test$.createTest(dto);
    }

    @Patch("")
    async editTest(@BodyWithout(["status"]) dto: EditTestDTO) {
        return await this.test$.editTest(dto);
    }

    @Patch("status")
    async changeTestStatus(@BodyWithout() dto: ChangeTestStatusDTO) {
        return await this.test$.changeTestStatus(dto);
    }

    @Delete("")
    async deleteTest(@Query("id") id: string) {
        return await this.test$.deleteTest(id);
    }
}