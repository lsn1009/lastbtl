import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICauhoi } from 'app/shared/model/cauhoi.model';
import {IUser} from "app/core/user/user.model";

type EntityResponseType = HttpResponse<ICauhoi>;
type EntityArrayResponseType = HttpResponse<ICauhoi[]>;

@Injectable({ providedIn: 'root' })
export class CauhoiService {
  public resourceUrl = SERVER_API_URL + 'api/cauhois';
  public urlRandom = SERVER_API_URL + 'api/cauhois/random';
  public urlUser = SERVER_API_URL + 'api/users/getUser';
  constructor(protected http: HttpClient) {}

  create(cauhoi: ICauhoi): Observable<EntityResponseType> {
    return this.http.post<ICauhoi>(this.resourceUrl, cauhoi, { observe: 'response' });
  }

  update(cauhoi: ICauhoi): Observable<EntityResponseType> {
    return this.http.put<ICauhoi>(this.resourceUrl, cauhoi, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICauhoi>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICauhoi[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  queryRandom(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICauhoi[]>(this.urlRandom, { params: options, observe: 'response' });
  }
  queryUser(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.urlUser, { params: options, observe: 'response' });
  }
}
