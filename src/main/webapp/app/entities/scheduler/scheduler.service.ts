import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IScheduler } from 'app/shared/model/scheduler.model';

type EntityResponseType = HttpResponse<IScheduler>;
type EntityArrayResponseType = HttpResponse<IScheduler[]>;

@Injectable({ providedIn: 'root' })
export class SchedulerService {
  public resourceUrl = SERVER_API_URL + 'api/schedulers';

  constructor(protected http: HttpClient) {}

  create(scheduler: IScheduler): Observable<EntityResponseType> {
    return this.http.post<IScheduler>(this.resourceUrl, scheduler, { observe: 'response' });
  }

  update(scheduler: IScheduler): Observable<EntityResponseType> {
    return this.http.put<IScheduler>(this.resourceUrl, scheduler, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IScheduler>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IScheduler[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
