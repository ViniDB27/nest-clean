import { PaginateParams } from '@/core/repositories/pagination-params'
import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments.repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionCommentRepository
  implements QuestionCommentRepository
{
  create(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findById(questionCommentId: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.')
  }
  findByQuestionId(
    questionId: string,
    params: PaginateParams,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.')
  }
}
