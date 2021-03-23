import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  public host = environment.apiUrl;
  private token: string;
  private loggedInUsername: string;
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<HttpResponse<User>>{
    return this.http.post<User>(`${this.host}/auth/login`, user, {observe: 'response'});

  }

  public saveToken(token: string): void {
    localStorage.setItem('tokenPlantManagerApp', token);
  }

  public getToken(): string {
    return this.token;
  }
  public loadToken(): void {
    this.token = localStorage.getItem('tokenPlantManagerApp');
  }

  addUserToLocalStorage(user: User): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  public clearUserAndTokenFromLocalStorage():void {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('tokenPlantManagerApp');
  }

  public isUserLoggedIn(): boolean {
    this.token = localStorage.getItem('tokenPlantManagerApp');
    if(this.token == null || this.token === 'undefined' || this.token === '') {
      return false;
    }
    return true;
  }
}
