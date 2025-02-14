import { PaginateParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment.entity'

export abstract class QuestionCommentRepository {
  abstract create(questionComment: QuestionComment): Promise<void>
  abstract delete(questionComment: QuestionComment): Promise<void>
  abstract findById(questionCommentId: string): Promise<QuestionComment| null>
  abstract findByQuestionId(questionId: string, params: PaginateParams): Promise<QuestionComment[]>
}
