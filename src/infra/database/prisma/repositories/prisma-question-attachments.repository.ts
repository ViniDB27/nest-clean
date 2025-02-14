import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments.repository'
import { QuestionAttchment } from '@/domain/forum/enterprise/entities/question-attachment.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestiomAttachmentsRepository
  implements QuestionAttachmentRepository
{
  findManyByQuestionId(questionId: string): Promise<QuestionAttchment[]> {
    throw new Error('Method not implemented.')
  }
  deleteManyByQuestionId(questionId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
