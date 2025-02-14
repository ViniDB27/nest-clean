import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { StudentsRepository } from '@/domain/forum/application/repositories/student.repository'
import { Student } from '@/domain/forum/enterprise/entities/student.entity'
import { PrismaStudentMapper } from '../mappers/prisma-student.mapper'

@Injectable()
export class PrismaStudentRepository implements StudentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(student: Student) {
    await this.prisma.user.create({
      data: PrismaStudentMapper.toPrisma(student),
    })
  }

  async findByEmail(email: string) {
    const student = await this.prisma.user.findUnique({ where: { email } })
    if (!student!) return null
    return PrismaStudentMapper.toDomain(student)
  }
}
