import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { StudentsRepository } from '../repositories/student.repository'
import { HasherCompare } from '../../cryptography/hasher-compare'
import { WrongCredentialsError } from './errors/wrong-credentials.error'
import { Encrypter } from '../../cryptography/encrypter'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly hasherCompare: HasherCompare,
    private readonly encrypter: Encrypter,
  ) {}

  async execute({ email, password }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email)
    if (!student) return left(new WrongCredentialsError())
    const isValidPassword = await this.hasherCompare.compare(password, student.password)
    if (!isValidPassword) return left(new WrongCredentialsError())
    const accessToken = await this.encrypter.encrypt({ sub: student.id.toString() })
    return right({ accessToken })
  }
}
