import { UniqueEntityId } from '../vos/unique-entity-id.vo'

export abstract class Entity<Props> {
  private readonly _id: UniqueEntityId
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: any, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId()
    this.props = props
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true
    }

    if(entity.id === this._id) {
      return true
    }

    return false
  }
}
