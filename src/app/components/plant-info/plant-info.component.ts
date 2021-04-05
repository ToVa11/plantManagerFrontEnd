import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Family } from 'src/app/model/family';
import { Plant } from 'src/app/model/plant';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FamilyService } from 'src/app/service/family.service';
import { PlantService } from 'src/app/service/plant.service';
import { UpdatePlantComponent } from '../update-plant/update-plant.component';

@Component({
  selector: 'app-plant-info',
  templateUrl: './plant-info.component.html',
  styleUrls: ['./plant-info.component.css']
})
export class PlantInfoComponent implements OnInit {

  @Input() plant: Plant;
  @Input() family: Family;

  public popoverTitle = 'Are you sure?';
  public popoverMessage = 'Are you sure you want to delete this plant?';
  public confirmText = 'Delete';
  public cancelText = 'Cancel';
  public confirmClicked=false;
  public cancelClicked=false;
  
  constructor(
    private authService: AuthenticationService, 
    private plantService: PlantService, 
    private familyService: FamilyService,
    public modalService: NgbModal
    ) { }

  ngOnInit(): void {
  }

  public isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  public deletePlant(plantId: number) {
    this.plantService.deletePlant(plantId).subscribe(
      () => {
        this.familyService.removePlantFromFamily(plantId, this.family.id);
      }
    );
  }

  public openEditPlantModal(plantId: number) {
    const plant = this.plantService.getPlant(plantId);
    const modalRef = this.modalService.open(UpdatePlantComponent);
    modalRef.componentInstance.plant = plant;
  }
}
