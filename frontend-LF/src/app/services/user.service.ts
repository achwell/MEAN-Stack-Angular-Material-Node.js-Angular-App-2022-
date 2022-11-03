import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {User} from "../models/user";

export const USER = "user";

export const USER_ADMIN = "userAdmin";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrlUsers = environment.apiURL + "users"

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string): Observable<{ token: string, user: string, isAdmin: boolean }> {
    return this.http.post<{ token: string, user: string, isAdmin: boolean }>(`${this.apiUrlUsers}/login`, {
      email,
      password
    }).pipe(
      map(userInfo => {
          localStorage.setItem(USER, userInfo.user);
          localStorage.setItem(USER_ADMIN, userInfo.isAdmin ? JSON.stringify(userInfo.isAdmin) : JSON.stringify(false));
          this.router.navigate(["/"]);
          return userInfo
        }
      )
    )
  }

  signup(email: string, password: string, isAdmin?: boolean): Observable<User> {
    return this.http.post<User>(`${this.apiUrlUsers}/register`, {email, password, isAdmin});
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrlUsers);
  }

  getOneUsers(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrlUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrlUsers}/register`, user);
  }

  updateUser(user: User, userId: string): Observable<User> {
    return this.http.put<User>(`${this.apiUrlUsers}/${userId}`, user);
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrlUsers}/${userId}`);
  }
}
