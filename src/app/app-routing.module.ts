import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyPlantsListComponent } from './components/family-plants-list/family-plants-list.component';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SuperAdminGuard } from './guards/super-admin.guard';


const routes: Routes = [
  {path: 'users', component: UserListComponent,canActivate:[SuperAdminGuard]},
  {path: 'updateUserProfile', component: UpdateUserProfileComponent},
  {path: '', component: FamilyPlantsListComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SuperAdminGuard]
})
export class AppRoutingModule { }
