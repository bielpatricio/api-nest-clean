import { Module } from '@nestjs/common'

import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

import { JwtEncrypter } from './jwt-encrypter'
import { BcryptHash } from './bcrypt-hash'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashComparer,
      useClass: BcryptHash,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHash,
    },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
