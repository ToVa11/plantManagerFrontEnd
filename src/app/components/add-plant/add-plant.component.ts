import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Ng2ImgMaxService } from 'ng2-img-max';
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
  public imageResizing=false;
  private plantHeaderImage: File;
  private plantProfileImage: File;


  constructor(
    private familyService: FamilyService,
    private plantService: PlantService,
    private imageService: Ng2ImgMaxService,
    private fb: FormBuilder
  ) { }



  ngOnInit(): void {
    this.plantForm = this.fb.group({
      familyId: [0, [Validators.min(0), Validators.required]],
      family:[],
      name:[,Validators.required],
      amountOfLight:[],
      amountOfWater:[],
      needsSpraying:[],
      remarks:[],
      headerImage:[,Validators.required],
      profileImage:[,Validators.required]
    });

    this.familyService.getFamilyNames().subscribe(
      (response) => { this.families = response }
    );

  }

  public onAddPlant() {
    const family = this.families.find(family => family.id === parseInt(this.plantForm.value.familyId));
    const formData = this.plantService.createNewPlantFormData(family, this.plantForm, this.plantHeaderImage, this.plantProfileImage);

    this.plantService.addPlant(formData).subscribe(
      (response) => {
        this.familyService.addPlantToFamiliesSubject(response);
        document.getElementById('dismissModalPlantBtn').click();
      },
      (error) => console.log(error.error.message)
    )
  }

  public onHeaderImageChange(file: File): void {
    this.imageResizing=true;
    this.imageService.resizeImage(file, 275, 183).subscribe(
      result => {
        if (result.size > 1000000) {
          this.imageService.compressImage(result, 10000).subscribe(
            compressed => {
              this.plantHeaderImage = null;
              this.plantHeaderImage = compressed;
            }
          )
        }
        else {          
          this.plantHeaderImage = null;
          this.plantHeaderImage = result;
        }
        this.imageResizing=false;
      },
      error => {
        console.log('😢 Oh no!', error);
        this.imageResizing=false;
      }
    );
  }

  public onProfileImageChange(file: File): void {
    this.plantProfileImage = file;
    this.imageResizing=true;
    

    if (file.size > 1000000) {
      this.imageService.compressImage(file, 1).subscribe(
        result => {
          this.plantProfileImage = null;
          this.plantProfileImage = result;
          this.imageResizing=false;
        },
        error => {
          console.log(error);
          this.imageResizing=false;
        }
      )
    }
  }
}
