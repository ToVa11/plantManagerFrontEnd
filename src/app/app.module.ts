import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './service/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FamilyHeaderComponent } from './components/family-header/family-header.component';
import { FamilyPlantsListComponent } from './components/family-plants-list/family-plants-list.component';
import { PlantInfoComponent } from './components/plant-info/plant-info.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AddPlantFamilyComponent } from './components/add-plant-family/add-plant-family.component';
import { FamilyService } from './service/family.service';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ToastrModule } from 'ngx-toastr';
import { UpdateFamilyComponent } from './components/update-family/update-family.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdatePlantComponent } from './components/update-plant/update-plant.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FamilyHeaderComponent,
    FamilyPlantsListComponent,
    PlantInfoComponent,
    AddPlantFamilyComponent,
    UpdateFamilyComponent,
    UpdatePlantComponent,
    EditUserComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2ImgMaxModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType:'danger'
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot()  
  ],
  providers: [
    FamilyService,
    AuthenticationService,
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
