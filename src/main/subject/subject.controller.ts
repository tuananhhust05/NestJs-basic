import { Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { BodyWithout } from "src/global/decorators/body-without.decorator";
import { Roles } from "src/global/decorators/role.decorator";
import { ARole } from "src/user/schemas/user.schema";
import { CreateSubjectDTO, EditSubjectDTO } from "./subject.dtos";
import { SubjectService } from "./subject.service";

@Controller("subject")
@Roles(ARole.admin)
export class SubjectController {
    constructor(private sbj$: SubjectService) { }

    @Get("all")
    @Roles(ARole.student)
    async getAll() {
        return await this.sbj$.getAll();
    }

    @Get(":id")
    @Roles(ARole.student)
    async getById(@Param("id") id: string) {
        return await this.sbj$.getById(id);
    }

    @Post("")
    async create(@BodyWithout(["_id"]) dto: CreateSubjectDTO) {
        return await this.sbj$.create(dto);
    }

    @Patch("")
    async edit(@BodyWithout() dto: EditSubjectDTO) {
        return await this.sbj$.edit(dto);
    }

    @Delete("")
    async delete(@Query("id") id: string) {
        return await this.sbj$.delete(id);
    }
}