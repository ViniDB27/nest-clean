import { Student } from "../../enterprise/entities/student.entity";

export abstract class StudentsRepository {
  abstract create(student: Student): Promise<void>
  abstract findByEmail(email: string): Promise<Student | null>
}
