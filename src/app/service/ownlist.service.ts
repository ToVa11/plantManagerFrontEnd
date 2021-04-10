import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { Plant } from '../model/plant';

@Injectable({
  providedIn: 'root'
})
export class OwnlistService {
  private host = environment.apiUrl;

  private ownlist: number[] = [];
  private ownlistSubject = new BehaviorSubject([]);
  public ownlist$ = this.ownlistSubject.asObservable();

  constructor(private http:HttpClient) { 
  }

  public getOwnlist() {
    return this.http.get<any>(`${this.host}/ownlist/get`);
  }

  public addPlantToOwnlist(plant: Plant): Observable<any> {
    return this.http.post<any>(`${this.host}/ownlist/add`, plant);
  }

  public deletePlantFromOwnlist(plant: Plant) {
    return this.http.post<any>(`${this.host}/ownlist/delete`, plant);
  }

  public updateOwnlistObservable(plantIds: number[]) {
    this.ownlist = plantIds;
    this.ownlistSubject.next(this.ownlist);
  }
}
