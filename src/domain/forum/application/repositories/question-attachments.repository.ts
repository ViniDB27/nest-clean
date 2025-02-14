import { QuestionAttchment } from '../../enterprise/entities/question-attachment.entity'

export abstract class QuestionAttachmentRepository {
  abstract findManyByQuestionId(questionId: string): Promise<QuestionAttchment[]>
  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}
