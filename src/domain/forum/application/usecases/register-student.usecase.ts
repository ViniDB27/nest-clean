import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { StudentsRepository } from '../repositories/student.repository'
import { Student } from '../../enterprise/entities/student.entity'
import { HasherGenerator } from '../../cryptography/hasher-generator'
import { StudentAlreadyExistsError } from './errors/student-already-exists.error'

interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly hasherGenerator: HasherGenerator,
  ) {}

  async execute({ name, email, password }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentSameEmail = await this.studentsRepository.findByEmail(email)
    if (studentSameEmail) return left(new StudentAlreadyExistsError(email))
    const hash = await this.hasherGenerator.hasing(password)
    const student = Student.create({ name, email, password: hash })
    await this.studentsRepository.create(student)
    return right({ student })
  }
}
