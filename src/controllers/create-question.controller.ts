import { Controller, HttpCode, Post, UseGuards, Body } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user.docorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.startegy'
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handler(
    @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const { sub } = user
    const question = await this.prisma.question.create({
      data: {
        title,
        slug: title.replaceAll(' ', '-'),
        content,
        author: { connect: { id: sub } },
      },
    })
    return { question }
  }
}
