import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/vos/unique-entity-id.vo'
import { Student, StudentProps } from '@/domain/forum/enterprise/entities/student.entity'

export function makeStudent(override: Partial<StudentProps>, id?: UniqueEntityId) {
  return Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )
}
