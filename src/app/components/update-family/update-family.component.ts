import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Family } from 'src/app/model/family';
import { FamilyService } from 'src/app/service/family.service';

@Component({
  selector: 'app-update-family',
  templateUrl: './update-family.component.html',
  styleUrls: ['./update-family.component.css']
})
export class UpdateFamilyComponent implements OnInit, OnDestroy {

  @Input() family: Family;
  private subscriptions: Subscription[] = [];

  constructor(public activeModal: NgbActiveModal,private familyService: FamilyService, private toastr: ToastrService) { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public updateFamily() {
    this.subscriptions.push(
      this.familyService.updateFamily(this.family).subscribe(
        (response) => {
          this.toastr.success(`${response.name} updated succesfully.`,"success");    
          this.activeModal.close();      
        },  
        (error) => {
          this.toastr.error(error.error.message);
        }
      )
    );
  }
}
