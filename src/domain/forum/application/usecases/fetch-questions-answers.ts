import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer.entity'
import { AnswersRepository } from '../repositories/answers.repository'
import { Injectable } from '@nestjs/common'

interface FetchQuestionAnswersCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswersCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

@Injectable()
export class FetchQuestionAnswersUseCase {
  constructor(private readonly questionRepository: AnswersRepository) {}

  async execute({ questionId, page }: FetchQuestionAnswersCaseRequest): Promise<FetchQuestionAnswersCaseResponse> {
    const answers = await this.questionRepository.findManyByQuestioId(questionId, { page })
    return right({ answers })
  }
}
