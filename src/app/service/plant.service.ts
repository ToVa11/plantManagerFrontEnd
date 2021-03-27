import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Family } from '../model/family';
import { Plant } from '../model/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public addPlant(formData:FormData) {
    return this.http.post(`${this.host}/plant/add`, formData);
  }

  public createNewPlantFormData(family: Family, plantForm: NgForm, plantHeaderImage: File) {
    const plant = new Plant(0, plantForm.value.name,plantForm.value.amountOfWater, plantForm.value.amountOfLight,plantForm.value.needsSpraying,plantForm.value.remarks,family);
    const formData = new FormData();
    formData.append('plantHeaderImage', plantHeaderImage);
    formData.append('plant',JSON.stringify(plant));
    
    return formData;
  }
}
