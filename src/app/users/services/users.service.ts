import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, Item } from '../interface/users.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User> {
    return this.http.get<User>(`${environment.production}/search/users?q=YOUR_NAME`);
  }

  getUser(user_login: string): Observable<Item> {
    return this.http.get<Item>(`${environment.production}/users/${user_login}`);
  }
}
