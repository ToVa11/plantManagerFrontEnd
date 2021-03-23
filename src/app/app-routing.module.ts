import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyPlantsListComponent } from './components/family-plants-list/family-plants-list.component';


const routes: Routes = [
  {path: '', component: FamilyPlantsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
