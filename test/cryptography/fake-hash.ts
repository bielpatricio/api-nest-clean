import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

export class FakeHash implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hash')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hash') === hash
  }
}
