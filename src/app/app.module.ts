import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './service/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FamilyHeaderComponent } from './components/family-header/family-header.component';
import { FamilyPlantsListComponent } from './components/family-plants-list/family-plants-list.component';
import { PlantInfoComponent } from './components/plant-info/plant-info.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AddPlantFamilyComponent } from './components/add-plant-family/add-plant-family.component';
import { FamilyService } from './service/family.service';
import { AddPlantComponent } from './components/add-plant/add-plant.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FamilyHeaderComponent,
    FamilyPlantsListComponent,
    PlantInfoComponent,
    AddPlantFamilyComponent,
    AddPlantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
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
