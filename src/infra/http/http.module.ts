import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { AnswerQuestionUseCase } from '@/domain/forum/application/usecases/answer-question.usecase'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/usecases/choose-question-best-answer.usecase'
import { CommentAnswerUseCase } from '@/domain/forum/application/usecases/comment-on-answer.usecase'
import { CommentQuestionUseCase } from '@/domain/forum/application/usecases/comment-on-question.usecase'
import { CreateQuestionUseCase } from '@/domain/forum/application/usecases/create-question.usecsae'
import { DeleteAnswerUseCase } from '@/domain/forum/application/usecases/delete-answer.usecase'
import { DeleteCommentAnswerUseCase } from '@/domain/forum/application/usecases/delete-comment-on-answer.usecase'
import { DeleteCommentQuestionUseCase } from '@/domain/forum/application/usecases/delete-comment-on-question.usecase'
import { DeleteQuestionUseCase } from '@/domain/forum/application/usecases/delete-question.usecsae'
import { EditAnswerUseCase } from '@/domain/forum/application/usecases/edit-answer.usecase'
import { EditQuestionUseCase } from '@/domain/forum/application/usecases/edit-question.usecase'
import { FetchCommentAnswerUseCase } from '@/domain/forum/application/usecases/fetch-comment-on-answer.usecase'
import { FetchCommentQuestionUseCase } from '@/domain/forum/application/usecases/fetch-comment-on-question.usecase'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/usecases/fetch-questions-answers'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/usecases/fetch-recent-questions.usecase'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/usecases/get-question-by-slug.usecase'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    AnswerQuestionUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentAnswerUseCase,
    CommentQuestionUseCase,
    CreateQuestionUseCase,
    DeleteAnswerUseCase,
    DeleteCommentAnswerUseCase,
    DeleteCommentQuestionUseCase,
    DeleteQuestionUseCase,
    EditAnswerUseCase,
    EditQuestionUseCase,
    FetchCommentAnswerUseCase,
    FetchCommentQuestionUseCase,
    FetchQuestionAnswersUseCase,
    FetchRecentQuestionsUseCase,
    GetQuestionBySlugUseCase,
  ]
})
export class HttpModule {}
