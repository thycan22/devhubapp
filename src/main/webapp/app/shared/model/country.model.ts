import { ICustomer } from 'app/shared/model/customer.model';

export interface ICountry {
  id?: number;
  country?: string;
  customers?: ICustomer[];
}

export class Country implements ICountry {
  constructor(public id?: number, public country?: string, public customers?: ICustomer[]) {}
}
