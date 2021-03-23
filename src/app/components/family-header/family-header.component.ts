import { Component, Input, OnInit } from '@angular/core';
import { Family } from 'src/app/model/family';

@Component({
  selector: 'app-family-header',
  templateUrl: './family-header.component.html',
  styleUrls: ['./family-header.component.css']
})
export class FamilyHeaderComponent implements OnInit {

  @Input() family: Family;
  
  constructor() { }

  ngOnInit(): void {
  }

}
