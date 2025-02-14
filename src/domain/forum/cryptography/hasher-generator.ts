export abstract class HasherGenerator {
  abstract hasing(plain: string): Promise<string>
}
