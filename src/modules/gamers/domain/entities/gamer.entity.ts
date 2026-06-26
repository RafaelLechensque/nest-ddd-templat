import { MembershipType } from '../enums/membership.enum';

export interface IGamer {
  name: string;
  email: string;
  membership: MembershipType;
}

export class Gamer {
  private _id: string;
  private _props: IGamer;

  private constructor(id: string, props: IGamer) {
    this._id = id;
    this._props = props;
  }

  public static create(id: string, props: IGamer): Gamer {
    return new Gamer(id, props);
  }

  public updateSpecs(name: string, email: string, membership: MembershipType) {
    this._props.name = name;
    this._props.email = email;
    this._props.membership = membership;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._props.name;
  }

  get email(): string {
    return this._props.email;
  }

  get membership(): MembershipType {
    return this._props.membership;
  }
}
