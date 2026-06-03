import { BookingType } from '../enums/booking-type.enum';
import { BookingRuleException } from '../exceptions/booking-rule.exception';

export interface BookingSessionProps {
  gamerId: string;
  roomId: string;
  stationIds: string[]; // PCs reservados
  startTime: Date;
  endTime: Date;
  type: BookingType;
}

export class BookingSession {
  private _id: string;
  private _props: BookingSessionProps;

  private constructor(id: string, props: BookingSessionProps) {
    this._id = id;
    this._props = props;
  }

  // Factory Method para garantir que a entidade nasça válida
  public static create(id: string, props: BookingSessionProps): BookingSession {
    if (props.startTime >= props.endTime) {
      throw new BookingRuleException(
        'O horário de término deve ser maior que o de início.',
      );
    }
    if (props.type === BookingType.SOLO && props.stationIds.length !== 1) {
      throw new BookingRuleException(
        'Reservas SOLO devem conter exatamente 1 PC.',
      );
    }

    if (props.type === BookingType.DUO && props.stationIds.length !== 2) {
      throw new BookingRuleException(
        'Reservas DUO devem conter exatamente 2 PCs.',
      );
    }

    if (props.type === BookingType.TEAM && props.stationIds.length !== 5) {
      throw new BookingRuleException(
        'Reservas TEAM devem conter exatamente 5 PCs para o time.',
      );
    }

    return new BookingSession(id, props);
  }

  // Getters para expor os dados de forma limpa
  get id(): string {
    return this._id;
  }
  get roomId(): string {
    return this._props.roomId;
  }
  get stationIds(): string[] {
    return this._props.stationIds;
  }
  get startTime(): Date {
    return this._props.startTime;
  }
  get endTime(): Date {
    return this._props.endTime;
  }
  get type(): BookingType {
    return this._props.type;
  }
}
