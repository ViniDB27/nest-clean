import { PaginateParams } from "@/core/repositories/pagination-params";
import { Question } from "../../enterprise/entities/question.entity";

export abstract class QuestionRepository {
  abstract create(question: Question): Promise<void>
  abstract update(question: Question): Promise<void>
  abstract delete(question: Question): Promise<void>
  abstract findById(questionId: string): Promise<Question | null>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findManyRecent(params: PaginateParams): Promise<Question[]>
}