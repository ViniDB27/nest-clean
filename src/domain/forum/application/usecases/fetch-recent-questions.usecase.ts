import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question.entity'
import { QuestionRepository } from '../repositories/questions.repository'
import { Injectable } from '@nestjs/common'

interface FetchRecentQuestionsCaseRequest {
  page: number
}

type FetchRecentQuestionsCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({ page }: FetchRecentQuestionsCaseRequest): Promise<FetchRecentQuestionsCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })
    return right({ questions })
  }
}
