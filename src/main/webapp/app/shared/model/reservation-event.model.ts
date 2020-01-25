import { Moment } from 'moment';
import { IResource } from 'app/shared/model/resource.model';
import { IPrice } from 'app/shared/model/price.model';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IReservationEvent {
  id?: number;
  start?: Moment;
  end?: Moment;
  text?: string;
  nbDay?: number;
  nbAdult?: number;
  nbChild?: number;
  resource?: IResource;
  price?: IPrice;
  customer?: ICustomer;
}
export interface EventCreateParams {
  start: string;
  end: string;
  text: string;
  resource: string | number;
}

export interface EventData {
  id: string | number;
  start: string;
  end: string;
  text: string;
  resource: string | number;
}

export class ReservationEvent implements IReservationEvent {
  constructor(
    public id?: number,
    public start?: Moment,
    public end?: Moment,
    public text?: string,
    public nbDay?: number,
    public nbAdult?: number,
    public nbChild?: number,
    public resource?: IResource,
    public price?: IPrice,
    public customer?: ICustomer
  ) {}
}
