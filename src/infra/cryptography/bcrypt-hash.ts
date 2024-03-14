import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { compare, hash } from 'bcryptjs'

export class BcryptHash implements HashGenerator, HashComparer {
  private HASH_SALT_LENGth = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGth)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
