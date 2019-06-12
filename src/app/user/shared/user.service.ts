import { Injectable } from '@angular/core';
import { User } from './user.model';

import { Http, Response, Headers, RequestMethod, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  headerOptions = new Headers({ 'content-type': 'application/json' })
  selectedUser: User;
  usersList: User[];
  constructor(private http: Http) { }

  postUser(user: User) {
    var body = JSON.stringify(user);
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: this.headerOptions })
    return this.http.post('http://localhost:9081/users', body, requestOptions).map(x => x.json)
  }

  putUser(id, user) {
    var body = JSON.stringify(user);
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: this.headerOptions })
    return this.http.put('http://localhost:9081/users' + id, body, requestOptions).map(x => x.json)
  }

  getUsersList() {
    this.http.get('http://localhost:9081/users')
      .map((data: Response) => {
        return data.json() as User[];
      }).toPromise().then(x => {
        this.usersList = x;
      })
  }
  deleteUser(id: number) {
    return this.http.delete('http://localhost:9081/users/' + id).map(x => x.json)
  }

}
