import { Module } from '@nestjs/common'

import { HasherGenerator } from '@/domain/forum/cryptography/hasher-generator'
import { HasherCompare } from '@/domain/forum/cryptography/hasher-compare'
import { Encrypter } from '@/domain/forum/cryptography/encrypter'

import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    {
      provide: HasherGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HasherCompare,
      useClass: BcryptHasher,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
  ],
  exports: [HasherGenerator, HasherCompare, Encrypter],
})
export class CryptographModule {}
