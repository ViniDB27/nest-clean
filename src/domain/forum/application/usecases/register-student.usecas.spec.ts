import { RegisterStudentUseCase } from './register-student.usecase'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-students.repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

describe('Register Student Use Case', async () => {
  let fakeHasher: FakeHasher
  let studentsRepository: InMemoryStudentRepository
  let sut: RegisterStudentUseCase

  beforeEach(() => {
    fakeHasher = new FakeHasher()
    studentsRepository = new InMemoryStudentRepository()
    sut = new RegisterStudentUseCase(studentsRepository, fakeHasher)
  })

  it('shold be able to register a student', async () => {
    const result = await sut.execute({
      name: 'john doe',
      email: 'john@doe.com',
      password: '123456789',
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value).toEqual({
      student: studentsRepository.items[0],
    })
  })

  it('shold hash student password upon register ', async () => {
    const result = await sut.execute({
      name: 'john doe',
      email: 'john@doe.com',
      password: '123456789',
    })

    expect(result.isRight()).toEqual(true)
    expect(studentsRepository.items[0].password).toEqual('123456789-hashed')
  })
})
