import { StudentsRepository } from '@/domain/forum/application/repositories/student.repository'
import { Student } from '@/domain/forum/enterprise/entities/student.entity'

export class InMemoryStudentRepository implements StudentsRepository {
  public items: Student[] = []

  async create(student: Student) {
    this.items.push(student)
  }
  async findByEmail(email: string) {
    return this.items.find((item) => item.email === email) ?? null
  }
}
