import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public editUser(user: User) {
    return this.http.put<User>(`${this.host}/user/update`, user);
  }

  
  updateProfileImage(image: File, username: string) {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, this.setFormData(image, username));
  }

  private setFormData(image: File, username: string): FormData {
    const formData = new FormData();
    formData.append('profileImage', image);
    formData.append('username', username);
    return formData;
  }
}
