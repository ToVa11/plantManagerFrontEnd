import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyPlantsListComponent } from './components/family-plants-list/family-plants-list.component';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';
import { UserListComponent } from './components/user-list/user-list.component';


const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'updateUserProfile', component: UpdateUserProfileComponent},
  {path: '', component: FamilyPlantsListComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
