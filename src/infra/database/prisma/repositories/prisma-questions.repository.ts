import { PaginateParams } from '@/core/repositories/pagination-params'
import { QuestionRepository } from '@/domain/forum/application/repositories/questions.repository'
import { Question } from '@/domain/forum/enterprise/entities/question.entity'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question.mapper'

@Injectable()
export class PrismaQuestionRepository implements QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(question: Question) {
    await this.prisma.question.create({
      data: PrismaQuestionMapper.toPrisma(question),
    })
  }

  async update(question: Question) {
    await this.prisma.question.update({
      where: { id: question.id.toString() },
      data: PrismaQuestionMapper.toPrisma(question),
    })
  }

  async delete(question: Question) {
    await this.prisma.question.delete({ where: { id: question.id.toString() } })
  }

  async findById(questionId: string) {
    const question = await this.prisma.question.findUnique({ where: { id: questionId } })
    if (!question!) return null
    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string) {
    const question = await this.prisma.question.findUnique({ where: { slug } })
    if (!question!) return null
    return PrismaQuestionMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginateParams) {
    const questions = await this.prisma.question.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return questions.map(PrismaQuestionMapper.toDomain)
  }
}
