import { Either, left, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment.entity'
import { QuestionCommentRepository } from '../repositories/question-comments.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface DeleteCommentQuestionUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteCommentQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    questionComment: QuestionComment
  }
>

@Injectable()
export class DeleteCommentQuestionUseCase {
  constructor(private readonly questionCommentRepository: QuestionCommentRepository) {}

  async execute({ authorId, questionCommentId }: DeleteCommentQuestionUseCaseRequest): Promise<DeleteCommentQuestionUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(questionCommentId)
    if (!questionComment) return left(new ResourceNotFoundError())
    if (questionComment.authorId.toString() !== authorId) return left(new NotAllowedError())
    await this.questionCommentRepository.delete(questionComment)
    return right({ questionComment })
  }
}
