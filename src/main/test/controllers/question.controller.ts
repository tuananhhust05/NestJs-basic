import { Controller, Delete, Get, Patch, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { BodyWithout } from "src/global/decorators/body-without.decorator";
import { Roles } from "src/global/decorators/role.decorator";
import { ARole } from "src/user/schemas/user.schema";
import { CreateQuestionDTO, EditQuestionDTO } from "../dtos/question.dtos";
import { QuestionService } from "../services/question.service";

@Controller("question")
@Roles(ARole.admin)
export class QuestionController {
    constructor(private qst$: QuestionService) { }

    @Get("all") 
    @Roles(ARole.student)
    async getAll() {
        return await this.qst$.getAll();
    }

    @Post("")
    async createQuestion(@BodyWithout(["_id"]) dto: CreateQuestionDTO) {
        return await this.qst$.createQuestion(dto);
    }

    @Patch("")
    async editQuestion(@BodyWithout(["testId"]) dto: EditQuestionDTO) {
        return await this.qst$.editQuestion(dto);
    }

    @Delete("")
    async deleteQuestion(@Query("id") id: string) {
        return await this.qst$.deleteQuestion(id);
    }
}