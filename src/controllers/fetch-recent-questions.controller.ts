import { Controller, HttpCode, UseGuards, Body, Get } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @HttpCode(201)
  async handler() {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { questions }
  }
}
