import { PaginateParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers.repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerRepository implements AnswersRepository {
  create(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }
  update(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }
  findById(answerId: string): Promise<Answer | null> {
    throw new Error('Method not implemented.')
  }
  findManyByQuestioId(questionId: string, params: PaginateParams): Promise<Answer[]> {
    throw new Error('Method not implemented.')
  }

}
