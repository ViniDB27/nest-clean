import { Body, Controller, HttpCode, Post, ConflictException, UsePipes } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(255),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('accounts')
export class CreateAccountController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handler(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body
    const userWithSameEmail = await this.prisma.user.findUnique({ where: { email } })
    if (userWithSameEmail) throw new ConflictException('Email already in use')
    await this.prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 8),
      },
    })
  }
}
