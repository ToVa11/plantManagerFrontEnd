import { Component, Input, OnInit } from '@angular/core';
import { Family } from 'src/app/model/family';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FamilyService } from 'src/app/service/family.service';

@Component({
  selector: 'app-family-header',
  templateUrl: './family-header.component.html',
  styleUrls: ['./family-header.component.css']
})
export class FamilyHeaderComponent implements OnInit {

  @Input() family: Family;
  
  public popoverTitle = 'Are you sure?';
  public popoverMessage = 'Are you sure you want to delete this plant?';
  public confirmText = 'Delete';
  public cancelText = 'Cancel';
  public confirmClicked=false;
  public cancelClicked=false;

  constructor(private familyService: FamilyService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public deleteFamily(familyId: number) {
    if(!this.familyService.familyHasPlants(familyId)) {
      this.familyService.deleteFamily(familyId).subscribe(
        () => {
          console.log('deleted');
        }
      );
    }
    else {
      console.log(this.familyService.familyHasPlants(familyId));
    }
  }

  public isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }
}
