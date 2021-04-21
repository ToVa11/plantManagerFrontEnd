import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public editUser(user: User) {
    return this.http.put<User>(`${this.host}/user/update`, user);
  }
  
  public updateProfileImage(image: File, username: string) {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, this.setFormData(image, username));
  }
  
  updateAuthorities(user: User) {
    return this.http.put<User>(`${this.host}/user/authorities/update`, user);
  }

  private setFormData(image: File, username: string): FormData {
    const formData = new FormData();
    formData.append('profileImage', image);
    formData.append('username', username);
    return formData;
  }
}
