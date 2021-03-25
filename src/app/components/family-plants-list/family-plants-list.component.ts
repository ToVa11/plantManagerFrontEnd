import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Family } from 'src/app/model/family';
import { FamilyService } from 'src/app/service/family.service';

@Component({
  selector: 'app-family-plants-list',
  templateUrl: './family-plants-list.component.html',
  styleUrls: ['./family-plants-list.component.css'],
  providers: []
})
export class FamilyPlantsListComponent implements OnInit {

  public families: Family[] = [];

  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {
    this.familyService.getFamilies().subscribe(
      (families) => { this.familyService.setFamilies(families) }
    );
    this.getFamilies();

  }

  public getFamilies() {
    this.familyService.families$.subscribe(families => this.families = families);
  }


}
