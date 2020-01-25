import { IReservationEvent } from 'app/shared/model/reservation-event.model';
import { Season } from 'app/shared/model/enumerations/season.model';

export interface IPrice {
  id?: number;
  price?: number;
  statusPeriod?: Season;
  reservationEvents?: IReservationEvent[];
}

export class Price implements IPrice {
  constructor(public id?: number, public price?: number, public statusPeriod?: Season, public reservationEvents?: IReservationEvent[]) {}
}
