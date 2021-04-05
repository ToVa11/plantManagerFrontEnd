import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Family } from 'src/app/model/family';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { FamilyService } from 'src/app/service/family.service';
import { UpdateFamilyComponent } from '../update-family/update-family.component';

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


  constructor(
    private familyService: FamilyService, 
    private authService: AuthenticationService, 
    private toastr:ToastrService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
  }

  public deleteFamily(familyId: number) {
    if(!this.familyService.familyHasPlants(familyId)) {
      this.familyService.deleteFamily(familyId).subscribe(
        () => {
          this.toastr.success('Family deleted', 'Deleted');
        }
      );
    }
    else {
      this.toastr.warning('Family still has plants and cannot be deleted.', 'Warning');
    }
  }

  public isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  openFamilyModal(familyId: number) {  
    const familyModal = this.modalService.open(UpdateFamilyComponent);
    const family = this.familyService.getFamily(familyId);
    familyModal.componentInstance.family = family;
  }
}
