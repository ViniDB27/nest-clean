import { z } from 'zod'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { RegisterStudentUseCase } from '@/domain/forum/application/usecases/register-student.usecase'
import { StudentAlreadyExistsError } from '@/domain/forum/application/usecases/errors/student-already-exists.error'
import { Public } from '@/infra/auth/public'

const createAccountBodySchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(255),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('accounts')
@Public()
export class CreateAccountController {
  constructor(private readonly register: RegisterStudentUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handler(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body
    const result = await this.register.execute({ name, email, password })
    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException()
      }
    }
  }
}
