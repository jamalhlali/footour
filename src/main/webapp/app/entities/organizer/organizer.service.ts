import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrganizer } from 'app/shared/model/organizer.model';

type EntityResponseType = HttpResponse<IOrganizer>;
type EntityArrayResponseType = HttpResponse<IOrganizer[]>;

@Injectable({ providedIn: 'root' })
export class OrganizerService {
  public resourceUrl = SERVER_API_URL + 'api/organizers';

  constructor(protected http: HttpClient) {}

  create(organizer: IOrganizer): Observable<EntityResponseType> {
    return this.http.post<IOrganizer>(this.resourceUrl, organizer, { observe: 'response' });
  }

  update(organizer: IOrganizer): Observable<EntityResponseType> {
    return this.http.put<IOrganizer>(this.resourceUrl, organizer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrganizer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrganizer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
