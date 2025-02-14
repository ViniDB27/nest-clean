import { Controller, HttpCode, Post, UseGuards, Body, BadRequestException } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user.docorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.startegy'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { CreateQuestionUseCase } from '@/domain/forum/application/usecases/create-question.usecsae'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private readonly createQuestion: CreateQuestionUseCase) {}

  @Post()
  @HttpCode(201)
  async handler(
    @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const { sub } = user
    const result = await this.createQuestion.execute({
      authorId: sub,
      title,
      content,
      attachmentsIds: [],
    })
    if (result.isLeft()) throw new BadRequestException()
  }
}
