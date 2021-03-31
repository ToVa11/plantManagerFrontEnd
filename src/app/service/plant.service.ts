import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Family } from '../model/family';
import { Plant } from '../model/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  
  public getPlant(plantId: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.host}/plant/${plantId}`)
  }

  public addPlant(formData: FormData): Observable<Plant> {
    return this.http.post<Plant>(`${this.host}/plant/add`, formData);
  }

  public createNewPlantFormData(family: Family, plantForm: NgForm, plantHeaderImage: File, plantProfileImage: File) {
    const plant = new Plant(0, plantForm.value.name, plantForm.value.amountOfWater, plantForm.value.amountOfLight, plantForm.value.needsSpraying, plantForm.value.remarks, family);
    const formData = new FormData();
    formData.append('plantHeaderImage', plantHeaderImage);
    formData.append('plantProfileImage', plantProfileImage);
    formData.append('plant', JSON.stringify(plant));

    return formData;
  }

  public deletePlant(id: number) {    
    return this.http.delete(`${this.host}/plant/delete/${id}`);
  }
}
