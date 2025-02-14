import { HasherCompare } from '@/domain/forum/cryptography/hasher-compare'
import { HasherGenerator } from '@/domain/forum/cryptography/hasher-generator'

export class FakeHasher implements HasherGenerator, HasherCompare {
  async hasing(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
