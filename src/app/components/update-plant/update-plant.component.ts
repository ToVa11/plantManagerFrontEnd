import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Family } from 'src/app/model/family';
import { Plant } from 'src/app/model/plant';
import { FamilyService } from 'src/app/service/family.service';
import { PlantService } from 'src/app/service/plant.service';

@Component({
  selector: 'app-update-plant',
  templateUrl: './update-plant.component.html',
  styleUrls: ['./update-plant.component.css']
})
export class UpdatePlantComponent implements OnInit, OnDestroy {

  @Input() plant: Plant;

  public plantForm: any;
  public families: Family[] = [];
  public imageResizing = false;
  private plantHeaderImage: File = null;
  private plantProfileImage: File = null;
  private subscriptions: Subscription[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private plantService: PlantService, 
    private familyService: FamilyService,
    private toastr: ToastrService,    
    private imageService: Ng2ImgMaxService) { }

  ngOnInit(): void {
    this.getFamilies();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public getFamilies() {
    this.subscriptions.push(
      this.familyService.families$.subscribe(families => this.families = families)
    );
  }
  
  public onUpdatePlant() {
    const family = this.families.find(family => family.id === this.plant.family.id);
    const formData = this.plantService.createUpdatePlantFormData(family, this.plant, this.plantHeaderImage, this.plantProfileImage);

    this.subscriptions.push(
      this.plantService.updatePlant(formData).subscribe(
        (response) => {
          this.familyService.updatePlantToFamiliesSubject(response);
          this.activeModal.close();
          this.toastr.success('Plant updated successfully.', 'Added');
        },
        (error) => this.toastr.error(error.error.message,'Error')
      )
    );
  }

  public onHeaderImageChange(file: File): void {
    this.imageResizing = true;
    this.subscriptions.push(
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
          this.imageResizing = false;
        },
        error => {
          console.log('😢 Oh no!', error);
          this.imageResizing = false;
        }
      )
    );
  }

  public onProfileImageChange(file: File): void {
    this.plantProfileImage = file;

    if (file.size > 1000000) {
      this.imageResizing = true;
      this.subscriptions.push(
        this.imageService.compressImage(file, 1).subscribe(
          result => {
            this.plantProfileImage = null;
            this.plantProfileImage = result;
            this.imageResizing = false;
          },
          error => {
            console.log(error);
            this.imageResizing = false;
          }
        )
      );
    }
  }

}
