import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  uploadsBaseURL = environment.uploadsBaseURL;

  @Input() club: any;
  fieldTypes: string[];

  constructor() { }

  ngOnInit() {
    this.getFields();
  }
  getFields() {
    const countMap = {};
    this.club.fields.forEach((cancha) => {
      countMap[cancha.fieldType] = countMap[cancha.fieldType] ? countMap[cancha.fieldType] + 1 : 1;
    });
    this.fieldTypes = Object.keys(countMap);
    console.log(this.fieldTypes);
  }

}
