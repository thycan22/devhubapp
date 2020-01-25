import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRoomType } from 'app/shared/model/room-type.model';

type EntityResponseType = HttpResponse<IRoomType>;
type EntityArrayResponseType = HttpResponse<IRoomType[]>;

@Injectable({ providedIn: 'root' })
export class RoomTypeService {
  public resourceUrl = SERVER_API_URL + 'api/room-types';

  constructor(protected http: HttpClient) {}

  create(roomType: IRoomType): Observable<EntityResponseType> {
    return this.http.post<IRoomType>(this.resourceUrl, roomType, { observe: 'response' });
  }

  update(roomType: IRoomType): Observable<EntityResponseType> {
    return this.http.put<IRoomType>(this.resourceUrl, roomType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRoomType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRoomType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
