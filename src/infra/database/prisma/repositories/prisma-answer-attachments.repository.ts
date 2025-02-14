import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments.repository'
import { AnswerAttchment } from '@/domain/forum/enterprise/entities/answer-attachment.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentRepository
{
  findManyByAnswerId(answerId: string): Promise<AnswerAttchment[]> {
    throw new Error('Method not implemented.')
  }
  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
