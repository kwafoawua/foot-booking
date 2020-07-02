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

  constructor() { }

  ngOnInit() {
  }

}
