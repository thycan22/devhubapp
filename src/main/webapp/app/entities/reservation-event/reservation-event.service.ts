import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReservationEvent } from 'app/shared/model/reservation-event.model';
import { DayPilot } from 'daypilot-pro-angular';

type EntityResponseType = HttpResponse<IReservationEvent>;
type EntityArrayResponseType = HttpResponse<IReservationEvent[]>;

@Injectable({ providedIn: 'root' })
export class ReservationEventService {
  public resourceUrl = SERVER_API_URL + 'api/reservation-events';

  constructor(protected http: HttpClient) {}

  create(reservationEvent: IReservationEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reservationEvent);
    return this.http
      .post<IReservationEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reservationEvent: IReservationEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reservationEvent);
    return this.http
      .put<IReservationEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReservationEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReservationEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    return this.http.get('/api/reservation-events?from=' + from.toString() + '&to=' + to.toString()) as Observable<any>;
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reservationEvent: IReservationEvent): IReservationEvent {
    const copy: IReservationEvent = Object.assign({}, reservationEvent, {
      start: reservationEvent.start && reservationEvent.start.isValid() ? reservationEvent.start.format(DATE_FORMAT) : undefined,
      end: reservationEvent.end && reservationEvent.end.isValid() ? reservationEvent.end.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.start = res.body.start ? moment(res.body.start) : undefined;
      res.body.end = res.body.end ? moment(res.body.end) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reservationEvent: IReservationEvent) => {
        reservationEvent.start = reservationEvent.start ? moment(reservationEvent.start) : undefined;
        reservationEvent.end = reservationEvent.end ? moment(reservationEvent.end) : undefined;
      });
    }
    return res;
  }
}
