import { Controller, Post, Patch, Delete, Query } from "@nestjs/common";
import { BodyWithout } from "src/global/decorators/body-without.decorator";
import { Roles } from "src/global/decorators/role.decorator";
import { ARole } from "src/user/schemas/user.schema";
import { CreateAnswerDTO, EditAnswerDTO } from "../dtos/question.dtos";
import { QuestionService } from "../services/question.service";

@Controller("answer")
@Roles(ARole.admin)
export class AnswerController {
    constructor(private qst$: QuestionService) { }

    @Post("")
    async createAnswer(@BodyWithout(["_id"]) dto: CreateAnswerDTO) {
        return await this.qst$.createAnswer(dto);
    }

    @Patch("")
    async editAnswer(@BodyWithout() dto: EditAnswerDTO) {
        return await this.qst$.editAnswer(dto);
    }

    @Delete("")
    async deleteAnswer(@Query("questionId") questionId: string, @Query("answerId") answerId: string) {
        return await this.qst$.deleteAnswer(questionId, answerId);
    }
}