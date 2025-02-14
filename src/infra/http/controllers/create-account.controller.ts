import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { RegisterStudentUseCase } from '@/domain/forum/application/usecases/register-student.usecase'

const createAccountBodySchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(255),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('accounts')
export class CreateAccountController {
  constructor(private readonly register: RegisterStudentUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handler(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body
    const result = await this.register.execute({ name, email, password })
    if (result.isLeft()) throw new Error()
  }
}
