import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Family } from 'src/app/model/family';
import { FamilyService } from 'src/app/service/family.service';
import { PlantService } from 'src/app/service/plant.service';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {

  public plantForm: any;
  public families: Family[] = [];
  private plantHeaderImage: File;

  constructor(
    private familyService: FamilyService,
    private plantService: PlantService
  ) { }

  ngOnInit(): void {
    this.familyService.getFamilyNames().subscribe(
      (response) => {this.families = response}
    );
  }

  public onAddPlant(addPlantForm: NgForm) {
    const family = this.families.find(family => family.id === parseInt(addPlantForm.value.family));
    const formData=this.plantService.createNewPlantFormData(family,addPlantForm,this.plantHeaderImage);

    this.plantService.addPlant(formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error.error.message)
    )
  }

  public onProfileImageChange(file: File): void {
    this.plantHeaderImage = file;    
  }
}
