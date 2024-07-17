import { Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { BodyWithout } from "src/global/decorators/body-without.decorator";
import { Roles } from "src/global/decorators/role.decorator";
import { ARole } from "src/user/schemas/user.schema";
import { CreateSubjectTypeDTO, EditSubjectTypeDTO } from "./subject-type.dtos";
import { SubjectTypeService } from "./subject-type.service";

@Controller("subjecttype")
@Roles(ARole.admin)
export class SubjectTypeController {
    constructor(private sjt$: SubjectTypeService) { }

    @Get("all")
    @Roles(ARole.student)
    async getAll() {
        return await this.sjt$.getAll();
    }
    @Roles(ARole.student)
    @Get("subject/:subjectId")
    async getBySubject(@Param("subjectId") subjectId: string) {
        return await this.sjt$.getBySubject(subjectId);
    }

    @Get(":id")
    @Roles(ARole.student)
    async getById(@Param("id") id: string) {
        return await this.sjt$.getById(id);
    }

    @Post("")
    async create(@BodyWithout(["_id"]) dto: CreateSubjectTypeDTO) {
        return await this.sjt$.create(dto);
    }

    @Patch("")
    async edit(@BodyWithout() dto: EditSubjectTypeDTO) {
        return await this.sjt$.edit(dto);
    }

    @Delete("")
    async delete(@Query("id") id: string) {
        return await this.sjt$.delete(id);
    }
}