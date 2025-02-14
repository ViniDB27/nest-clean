import { UniqueEntityId } from '@/core/vos/unique-entity-id.vo'
import { Question } from '@/domain/forum/enterprise/entities/question.entity'
import { Slug } from '@/domain/forum/enterprise/vos/slug.vo'
import { Question as PrismaQuestion, Prisma } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(question: PrismaQuestion): Question {
    return Question.create(
      {
        authorId: new UniqueEntityId(question.authorId),
        bestAnswerId: question.bestAnswerId ? new UniqueEntityId(question.bestAnswerId) : null,
        title: question.title,
        slug: Slug.create(question.slug),
        content: question.content,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      },
      new UniqueEntityId(question.id),
    )
  }

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id?.toString(),
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      title: question.title,
      slug: question.slug.value,
      content: question.content,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
