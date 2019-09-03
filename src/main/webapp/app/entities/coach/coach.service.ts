import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICoach } from 'app/shared/model/coach.model';

type EntityResponseType = HttpResponse<ICoach>;
type EntityArrayResponseType = HttpResponse<ICoach[]>;

@Injectable({ providedIn: 'root' })
export class CoachService {
  public resourceUrl = SERVER_API_URL + 'api/coaches';

  constructor(protected http: HttpClient) {}

  create(coach: ICoach): Observable<EntityResponseType> {
    return this.http.post<ICoach>(this.resourceUrl, coach, { observe: 'response' });
  }

  update(coach: ICoach): Observable<EntityResponseType> {
    return this.http.put<ICoach>(this.resourceUrl, coach, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICoach>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICoach[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
