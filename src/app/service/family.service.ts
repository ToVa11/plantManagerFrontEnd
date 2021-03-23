import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Family } from '../model/family';


@Injectable({
  providedIn: 'root'
})
export class FamilyService {  
  
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>(`${this.host}/family/list`);
  }

  public addFamily(family: Family): Observable<Family> {
    return this.http.post<Family>(`${this.host}/family/add`,family);
  }

}
