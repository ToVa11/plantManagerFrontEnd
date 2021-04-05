import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Family } from '../model/family';
import { Plant } from '../model/plant';


@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  private host = environment.apiUrl;
  
  private families: Family[] = [];
  private familiesSubject = new BehaviorSubject([]);
  public families$ = this.familiesSubject.asObservable();

  private family: Family = new Family(0,'',[]);
  private familySubject = new BehaviorSubject<Family>(this.family);
  public family$ = this.familySubject.asObservable();

  constructor(private http: HttpClient) { }

  public getFamilies(): Observable<Family[]> {
    return this.http.get<Family[]>(`${this.host}/family/list`);
  }

  public getFamilyNames(): Observable<Family[]> {
    return this.http.get<Family[]>(`${this.host}/family/list/names`);
  }

  public setFamilies(families: Family[]) {
    this.families = families;
    this.familiesSubject.next(families);
  }

  public getFamily(familyId:number) {
    return this.families.find(family => family.id == familyId);
  }

  public addFamily(family: Family): Observable<Family> {
    return this.http.post<Family>(`${this.host}/family/add`,family);
  }

  public updateFamily(family: Family): Observable<Family> {
    return this.http.put<Family>(`${this.host}/family/update`, family);
  }

  public addFamilyToFamiliesSubject(family: Family) {
    this.families.push(family);
    this.familiesSubject.next(this.families);
  }

  public addPlantToFamiliesSubject(plant: Plant) {
    this.families.find(family => family.id == plant.family.id).plants.push(plant);
    this.familiesSubject.next(this.families);
  }  
  
  removePlantFromFamily(plantId: number, familyId: number) {
    let plants = this.families.find(family => family.id == familyId).plants.filter(plant => plant.id !== plantId);
    this.families.find(family => family.id == familyId).plants = plants;
    this.familiesSubject.next(this.families);
  }  

  removeFamilyFromObservable() {

  }
  
  public deleteFamily(familyId: number) {
      return this.http.delete(`${this.host}/family/delete/${familyId}`);
  }

  public familyHasPlants(familyId: number): any {
    const family = this.families.find(family => family.id == familyId);
    return family.plants.length > 0;
  }

}
