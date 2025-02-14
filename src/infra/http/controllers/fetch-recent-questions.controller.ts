import { Controller, HttpCode, UseGuards, Get, Query } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/usecases/fetch-recent-questions.usecase'

const pageQueryParamsSchema = z.string().optional().default('1').transform(Number).pipe(z.number().min(1))
type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>
const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private readonly fetchRecentQuestion: FetchRecentQuestionsUseCase) {}

  @Get()
  @HttpCode(201)
  async handler(@Query('page', queryValidationPipe) page: PageQueryParamsSchema) {
    const questions = await this.fetchRecentQuestion.execute({
      page: page,
    })
    return { questions }
  }
}
