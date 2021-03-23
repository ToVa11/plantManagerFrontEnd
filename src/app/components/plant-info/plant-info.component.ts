import { Component, Input, OnInit } from '@angular/core';
import { Plant } from 'src/app/model/plant';

@Component({
  selector: 'app-plant-info',
  templateUrl: './plant-info.component.html',
  styleUrls: ['./plant-info.component.css']
})
export class PlantInfoComponent implements OnInit {

  @Input() plant: Plant;
  
  constructor() { }

  ngOnInit(): void {
  }

}
