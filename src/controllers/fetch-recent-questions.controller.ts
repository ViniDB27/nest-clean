import { Controller, HttpCode, UseGuards, Body, Get, Query } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const pageQueryParamsSchema = z.string().optional().default('1').transform(Number).pipe(z.number().min(1))
type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>
const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @HttpCode(201)
  async handler(@Query('page', queryValidationPipe) page: PageQueryParamsSchema) {
    const questions = await this.prisma.question.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { questions }
  }
}
