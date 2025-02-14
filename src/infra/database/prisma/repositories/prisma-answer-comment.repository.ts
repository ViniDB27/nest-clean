import { PaginateParams } from "@/core/repositories/pagination-params";
import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comments.repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentRepository
{
    create(answerComment: AnswerComment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(answerComment: AnswerComment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(answerCommentId: string): Promise<AnswerComment | null> {
        throw new Error("Method not implemented.");
    }
    findByAnswerId(answerId: string, params: PaginateParams): Promise<AnswerComment[]> {
        throw new Error("Method not implemented.");
    }
}