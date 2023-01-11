import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  USERS_LIST_API,
  USER_DETAILS_API,
  USER_DELETE_API,
  USER_STATUS_API,
  
  
  USER_EDIT_API,
  USER_ADD,
  
} from 'src/app/constants/api.constants';

import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  sort: string;

  constructor(private $http: HttpService) {}

  getUserList(
    page: number = 1,
    limit: number,
    sort: string,
    search?: string,
  ): Observable<UserResp> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    params = params.set('sort', sort);


    if (search) {
      params = params.set('search', search);
    }
    return this.$http.get(USERS_LIST_API, params);
  }

  
  addUser(
    data: {}
  ): Observable<{
    status: number;
    message: string;
    data: {};
  }> {
    return this.$http.post(`${USER_ADD}`, data);
  }
}

interface UserResp {
  status: number;
  data: {
    count: number;
    user: {}[];
  };
}
