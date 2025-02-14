import { UniqueEntityId } from '@/core/vos/unique-entity-id.vo'
import { Student } from '@/domain/forum/enterprise/entities/student.entity'
import { User, Prisma } from '@prisma/client'

export class PrismaStudentMapper {
  static toDomain(student: User): Student {
    return Student.create(
      {
        name: student.name,
        email: student.email,
        password: student.password,
      },
      new UniqueEntityId(student.id),
    )
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id?.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    }
  }
}
