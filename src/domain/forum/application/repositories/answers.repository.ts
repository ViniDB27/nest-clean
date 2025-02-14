import { PaginateParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/answer.entity'

export abstract class AnswersRepository {
  abstract create(answer: Answer): Promise<void>
  abstract update(answer: Answer): Promise<void>
  abstract delete(answer: Answer): Promise<void>
  abstract findById(answerId: string): Promise<Answer | null>
  abstract findManyByQuestioId(questionId: string, params: PaginateParams): Promise<Answer[]>
}
