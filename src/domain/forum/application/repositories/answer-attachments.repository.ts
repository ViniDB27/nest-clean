import { AnswerAttchment } from '../../enterprise/entities/answer-attachment.entity'

export abstract class AnswerAttachmentRepository {
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttchment[]>
  abstract deleteManyByAnswerId(answerId: string): Promise<void>
}
