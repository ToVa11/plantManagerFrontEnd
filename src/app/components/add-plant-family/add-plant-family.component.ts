import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Family } from 'src/app/model/family';
import { FamilyService } from 'src/app/service/family.service';
import { FamilyPlantsListComponent } from '../family-plants-list/family-plants-list.component';

@Component({
  selector: 'app-add-plant-family',
  templateUrl: './add-plant-family.component.html',
  styleUrls: ['./add-plant-family.component.css'],
  providers: []
})
export class AddPlantFamilyComponent implements OnInit {

  constructor(private familyService: FamilyService, private router: Router) { }

  ngOnInit(): void {
  }

  
  public addFamily(familyForm: NgForm) {
    this.familyService.addFamily(familyForm.value).subscribe(
      (response) => {
        document.getElementById('dismissModalBtn').click();
        familyForm.reset();
        this.familyService.addFamilyToFamiliesSubject(response);
      }
    )
  }
}
