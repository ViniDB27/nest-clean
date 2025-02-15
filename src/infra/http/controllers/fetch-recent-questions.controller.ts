import {
  Controller,
  HttpCode,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/usecases/fetch-recent-questions.usecase'
import { QuestionPresenter } from '../presenters/questio.presenter'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))
type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>
const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@Controller('questions')
export class FetchRecentQuestionsController {
  constructor(
    private readonly fetchRecentQuestion: FetchRecentQuestionsUseCase,
  ) {}

  @Get()
  @HttpCode(201)
  async handler(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
  ) {
    const result = await this.fetchRecentQuestion.execute({ page })
    if (result.isLeft()) throw new BadRequestException()
    const { questions } = result.value
    return { questions: questions.map(QuestionPresenter.toHTTP) }
  }
}
