import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { ZodValidationPipe } from '@/pipes/zod-validation.pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('sessions')
export class AuthenticateController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handler(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) throw new UnauthorizedException(`invalid credentials`)
    const isPassword = await compare(password, user.password)
    if (!isPassword) throw new UnauthorizedException(`invalid credentials`)
    const accessToken = this.jwt.sign({
      sub: user.id,
    })

    return {
      access_token: accessToken,
    }
  }
}
