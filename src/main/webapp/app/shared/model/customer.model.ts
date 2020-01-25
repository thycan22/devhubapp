import { IReservationEvent } from 'app/shared/model/reservation-event.model';
import { ICountry } from 'app/shared/model/country.model';

export interface ICustomer {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  reservationCommands?: IReservationEvent[];
  country?: ICountry;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public reservationCommands?: IReservationEvent[],
    public country?: ICountry
  ) {}
}
