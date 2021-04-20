import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyPlantsListComponent } from './components/family-plants-list/family-plants-list.component';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';


const routes: Routes = [
  {path: 'updateUserProfile', component: UpdateUserProfileComponent},
  {path: '', component: FamilyPlantsListComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
