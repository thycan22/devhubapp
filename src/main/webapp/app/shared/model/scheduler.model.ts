export interface IScheduler {
  id?: number;
}

export class Scheduler implements IScheduler {
  constructor(public id?: number) {}
}
