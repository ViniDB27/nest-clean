import { InMemoryStudentRepository } from 'test/repositories/in-memory-students.repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { AuthenticateStudentUseCase } from './authenticate-student.usecase'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeStudent } from 'test/factories/make-student'
import { WrongCredentialsError } from './errors/wrong-credentials.error'

describe('Register Student Use Case', async () => {
  let fakeHasher: FakeHasher
  let encrypter: FakeEncrypter
  let studentsRepository: InMemoryStudentRepository
  let sut: AuthenticateStudentUseCase

  beforeEach(() => {
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()
    studentsRepository = new InMemoryStudentRepository()
    sut = new AuthenticateStudentUseCase(studentsRepository, fakeHasher, encrypter)
  })

  it('shold be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'john@doe.com',
      password: await fakeHasher.hasing('123456789'),
    })

    await studentsRepository.create(student)

    const result = await sut.execute({
      email: 'john@doe.com',
      password: '123456789',
    })

    expect(result.isRight()).toEqual(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('shold not be able to authenticate a student with wrong email', async () => {
    const student = makeStudent({
      email: 'john@doe.com',
      password: await fakeHasher.hasing('123456789'),
    })
    await studentsRepository.create(student)
    const result = await sut.execute({
      email: 'johnn@doe.com',
      password: '123456789',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('shold not be able to authenticate a student with wrong password', async () => {
    const student = makeStudent({
      email: 'john@doe.com',
      password: await fakeHasher.hasing('123456789'),
    })
    await studentsRepository.create(student)
    const result = await sut.execute({
      email: 'john@doe.com',
      password: '12345678',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
