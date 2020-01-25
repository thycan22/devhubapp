import { IRoomType } from 'app/shared/model/room-type.model';

export interface IResource {
  id?: number;
  name?: string;
  roomType?: IRoomType;
}

export class Resource implements IResource {
  constructor(public id?: number, public name?: string, public roomType?: IRoomType) {}
}
