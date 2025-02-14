import { PaginateParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment.entity'

export abstract class AnswerCommentRepository {
  abstract create(answerComment: AnswerComment): Promise<void>
  abstract delete(answerComment: AnswerComment): Promise<void>
  abstract findById(answerCommentId: string): Promise<AnswerComment | null>
  abstract findByAnswerId(
    answerId: string,
    params: PaginateParams,
  ): Promise<AnswerComment[]>
}
