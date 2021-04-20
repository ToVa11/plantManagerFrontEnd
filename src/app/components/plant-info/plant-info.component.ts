import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Family } from 'src/app/model/family';
import { Plant } from 'src/app/model/plant';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FamilyService } from 'src/app/service/family.service';
import { OwnlistService } from 'src/app/service/ownlist.service';
import { PlantService } from 'src/app/service/plant.service';
import { WishlistService } from 'src/app/service/wishlist.service';
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
  public confirmClicked = false;
  public cancelClicked = false;
  public onWishlist = false;
  public onOwnlist = false;

  private wishlist: number[] = [];
  private ownlist: number[] = [];

  constructor(
    private authService: AuthenticationService,
    private plantService: PlantService,
    private familyService: FamilyService,
    public modalService: NgbModal,
    private wishlistService: WishlistService,
    private ownlistService: OwnlistService
  ) { }

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe(
      (response) => {
        this.wishlist = response;
        this.onWishlist = this.checkPlantWishlist();
      }
    );
    
    this.ownlistService.ownlist$.subscribe(
      (response) => {
        this.ownlist = response;
        this.onOwnlist = this.checkPlantOwnlist();
      }
    );

    if (this.isUserLoggedIn()) {

      this.wishlistService.getWishlist().subscribe(
        (response) => {
          this.wishlist = response.plantIds;
          this.onWishlist = this.checkPlantWishlist();
        }
      );


      this.ownlistService.getOwnlist().subscribe(
        (response) => {
          this.ownlist = response.plantIds;
          this.onOwnlist = this.checkPlantOwnlist();
        }
      );
    }

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
    this.plantService.getPlant(plantId).subscribe(
      (plant) => {
        const modalRef = this.modalService.open(UpdatePlantComponent);
        modalRef.componentInstance.plant = plant;
        modalRef.componentInstance.family = plant.family;
      }
    );
  }

  public addPlantToWishlist(plant: Plant) {
    this.wishlistService.addPlantToWishlist(plant).subscribe(
      (response) => {
        this.wishlistService.updateWishlistObservable(response.plantIds);
        this.onWishlist = true;
      }
    );
  }

  public deletePlantFromWishlist(plant: Plant) {
    this.wishlistService.deletePlantFromWishlist(plant).subscribe(
      (response) => {
        this.wishlistService.updateWishlistObservable(response.plantIds)
        this.onWishlist = false;
      }
    )
  }
  public addPlantToOwnlist(plant: Plant) {
    this.ownlistService.addPlantToOwnlist(plant).subscribe(
      (response) => {
        this.ownlistService.updateOwnlistObservable(response.plantIds);
        this.onOwnlist = true;
      }
    );
  }

  public deletePlantFromOwnlist(plant: Plant) {
    this.ownlistService.deletePlantFromOwnlist(plant).subscribe(
      (response) => {
        this.ownlistService.updateOwnlistObservable(response.plantIds)
        this.onOwnlist = false;
      }
    )
  }

  private checkPlantWishlist(): boolean {
    if (this.wishlist.length <= 0) {
      return false;
    }
    let plantIds = this.wishlist.filter(plantId => plantId == this.plant.id);
    return plantIds.length > 0;
  }

  private checkPlantOwnlist(): boolean {
    if (this.ownlist.length <= 0) {
      return false;
    }
    let plantIds = this.ownlist.filter(plantId => plantId == this.plant.id);
    return plantIds.length > 0;
  }
}
