import { DomainException } from '../../../../shared/domain/exceptions/domain.exception';

export class BookingRuleException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
