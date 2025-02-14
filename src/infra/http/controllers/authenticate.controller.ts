import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/usecases/authenticate-student.usecase'
import { z } from 'zod'

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
    if (result.isLeft()) throw new Error()
    const { accessToken } = result.value
    return { accessToken }
  }
}
