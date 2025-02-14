import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestiomAttachmentsRepository } from './prisma/repositories/prisma-question-attachments.repository'
import { PrismaQuestionCommentRepository } from './prisma/repositories/prisma-question-comment.repository'
import { PrismaQuestionRepository } from './prisma/repositories/prisma-questions.repository'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments.repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comment.repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer.repository'
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments.repository'
import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments.repository'
import { QuestionRepository } from '@/domain/forum/application/repositories/questions.repository'
import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments.repository'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments.repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionAttachmentRepository,
      useClass: PrismaQuestiomAttachmentsRepository,
    },
    {
      provide: QuestionCommentRepository,
      useClass: PrismaQuestionCommentRepository,
    },
    {
      provide: QuestionRepository,
      useClass: PrismaQuestionRepository,
    },
    {
      provide: AnswerAttachmentRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: AnswerCommentRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswerRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionAttachmentRepository,
    QuestionCommentRepository,
    QuestionRepository,
    AnswerAttachmentRepository,
    AnswerCommentRepository,
    AnswersRepository,
  ],
})
export class DatabaseModule {}
