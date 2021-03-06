import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FamilyService } from 'src/app/service/family.service';

@Component({
  selector: 'app-add-plant-family',
  templateUrl: './add-plant-family.component.html',
  styleUrls: ['./add-plant-family.component.css'],
  providers: []
})
export class AddPlantFamilyComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private familyService: FamilyService, 
    private toastr: ToastrService
    ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

  }


  public addFamily(familyForm: NgForm) {
    this.subscriptions.push(
      this.familyService.addFamily(familyForm.value).subscribe(
        (response) => {
          document.getElementById('dismissAddPlantModalBtn').click();
          familyForm.reset();
          this.familyService.addFamilyToFamiliesSubject(response);
          this.toastr.success('Family added successfully.', 'Added');
        },
        (error) => {
          this.toastr.error(error.error.message, 'Error');
        }
      )
    );
  }
}
