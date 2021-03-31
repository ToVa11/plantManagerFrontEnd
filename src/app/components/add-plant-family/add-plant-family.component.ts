import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Family } from 'src/app/model/family';
import { FamilyService } from 'src/app/service/family.service';
import { FamilyPlantsListComponent } from '../family-plants-list/family-plants-list.component';

@Component({
  selector: 'app-add-plant-family',
  templateUrl: './add-plant-family.component.html',
  styleUrls: ['./add-plant-family.component.css'],
  providers: []
})
export class AddPlantFamilyComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(private familyService: FamilyService, private router: Router) { }
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
        }
      )
    );
  }
}
