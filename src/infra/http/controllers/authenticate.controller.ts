import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/usecases/authenticate-student.usecase'
import { z } from 'zod'
import { WrongCredentialsError } from '@/domain/forum/application/usecases/errors/wrong-credentials.error'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('sessions')
export class AuthenticateController {
  constructor(private readonly authenticate: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handler(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body
    const result = await this.authenticate.execute({ email, password })
    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException()
      }
    }
    const { accessToken } = result.value
    return { accessToken }
  }
}
