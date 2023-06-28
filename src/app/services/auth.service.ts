import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url = "http://localhost:3000/api"
  constructor(private http: HttpClient) { }
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();
  
  register(username: string, email: string, password: string, roles: string) {
    let urlLocal = `${this.url}/auth/signup`
    return this.http.post(urlLocal, {username, email, password, roles })
  }
  getUser() {
    return localStorage.getItem('currentUser');
  }
  setUser(token: string): void {
    let userDecoded: any = jwtDecode(token);
    localStorage.setItem('currentUser', userDecoded.user.username);
  }
  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }
  getToken() {
    return localStorage.getItem('accessToken');
  }
  login(email: string, password: string) {
    let urlLocal = `${this.url}/auth/signin`
    return this.http.post<any>(urlLocal, { email, password });
  }
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return true
  }
}
