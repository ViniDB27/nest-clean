import { Module } from '@nestjs/common'

import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/usecases/create-question.usecsae'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/usecases/fetch-recent-questions.usecase'
import { RegisterStudentUseCase } from '@/domain/forum/application/usecases/register-student.usecase'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/usecases/authenticate-student.usecase'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
  ],
})
export class HttpModule {}
