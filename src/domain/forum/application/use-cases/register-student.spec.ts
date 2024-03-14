import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { RegisterStudentUseCase } from './register-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { FakeHash } from 'test/cryptography/fake-hash'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHash: FakeHash
let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHash = new FakeHash()
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHash)
  })

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    const hashPassword = await fakeHash.hash('123456')

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryStudentsRepository.items[0].password).toEqual('123456-hash')
    expect(inMemoryStudentsRepository.items[0].password).toEqual(hashPassword)
  })
})
