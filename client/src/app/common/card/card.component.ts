import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

interface SocialMedia {
  facebookId?: string;
  twitterId?: string;
  instagramId?: string;
  snapchatId?: string;
  googleId?: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  uploadsBaseURL = environment.uploadsBaseURL;

  @Input() id: number;
  @Input() image: string;
  @Input() socialMedia: SocialMedia;
  @Input() destacado: boolean;
  @Input() name: string;
  @Input() description: string;
  constructor() { }

  ngOnInit() {
  }

}
