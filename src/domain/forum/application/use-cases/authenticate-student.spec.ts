import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { FakeHash } from 'test/cryptography/fake-hash'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHash: FakeHash
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHash = new FakeHash()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHash,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'john@example.com',
      password: await fakeHash.hash('123456'),
    })

    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: 'john@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
