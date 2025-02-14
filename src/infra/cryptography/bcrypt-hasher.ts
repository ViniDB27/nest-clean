import { HasherCompare } from '@/domain/forum/cryptography/hasher-compare'
import { HasherGenerator } from '@/domain/forum/cryptography/hasher-generator'
import { compare, hash } from 'bcryptjs'

export class BcryptHasher implements HasherGenerator, HasherCompare {
  private HASH_SALT_LENGTH = 8

  hasing(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
