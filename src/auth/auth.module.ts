import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthenticateController } from '@/controllers/authenticate.controller'
import { Env } from '@/env'
import { PrismaService } from '@/prisma/prisma.service'
import { JwtStrategy } from './jwt.startegy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })
        return {
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
          signOptions: { algorithm: 'RS256' },
        }
      },
    }),
  ],
  controllers: [AuthenticateController],
  providers: [JwtStrategy, PrismaService],
})
export class AuthModule {}
