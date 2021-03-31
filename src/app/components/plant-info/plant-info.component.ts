import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plant } from 'src/app/model/plant';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { PlantService } from 'src/app/service/plant.service';

@Component({
  selector: 'app-plant-info',
  templateUrl: './plant-info.component.html',
  styleUrls: ['./plant-info.component.css']
})
export class PlantInfoComponent implements OnInit {

  @Input() plant: Plant;
  
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

}
