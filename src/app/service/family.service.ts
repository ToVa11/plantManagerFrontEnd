import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Family } from '../model/family';


@Injectable({
  providedIn: 'root'
})
export class FamilyService {  
  
  private host = environment.apiUrl;
  private families: Family[] = [];
  private familiesSubject = new BehaviorSubject([]);
  public families$ = this.familiesSubject.asObservable();

  constructor(private http: HttpClient) { }

  public getFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>(`${this.host}/family/list`);
  }

  public getFamilyNames(): Observable<Family[]> {
    return this.http.get<Family[]>(`${this.host}/family/listNames`);
  }

  public setFamilies(families: Family[]) {
    this.families = families;
    this.familiesSubject.next(families);
  }

  public addFamily(family: Family): Observable<Family> {
    return this.http.post<Family>(`${this.host}/family/add`,family);
  }

  public addFamilyToFamiliesSubject(family: Family) {
    this.families.push(family);
    this.familiesSubject.next(this.families);
  }

}
