import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Family } from 'src/app/model/family';
import { FamilyService } from 'src/app/service/family.service';

@Component({
  selector: 'app-family-plants-list',
  templateUrl: './family-plants-list.component.html',
  styleUrls: ['./family-plants-list.component.css'],
  providers: []
})
export class FamilyPlantsListComponent implements OnInit, OnDestroy {

  public families: Family[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private familyService: FamilyService,
    private toastr: ToastrService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  ngOnInit(): void {
    this.familyService.getFamilies().subscribe(
      (families) => { this.familyService.setFamilies(families) },
      (error) => { this.toastr.error(error.error.message, 'Error')}
    );
    this.getFamilies();

  }

  public getFamilies() {
    this.subscriptions.push(
      this.familyService.families$.subscribe(families => this.families = families)
    );
  }

}
