import { IResource } from 'app/shared/model/resource.model';

export interface IRoomType {
  id?: number;
  typeBed?: string;
  bathroom?: boolean;
  resources?: IResource[];
}

export class RoomType implements IRoomType {
  constructor(public id?: number, public typeBed?: string, public bathroom?: boolean, public resources?: IResource[]) {
    this.bathroom = this.bathroom || false;
  }
}
