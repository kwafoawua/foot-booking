import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import {} from '@angular/http';


@Component({
  selector: 'app-site-header',
  moduleId: module.id,
  templateUrl: 'site-header.component.html',
  styleUrls: ['site-header.component.css']
})

export class SiteHeaderComponent implements OnInit {
  currentUser: any;
  username: string;

  constructor(private auth:AuthenticationService) {
    auth.isAuthenticated();
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser != undefined){
      this.username = this.currentUser.username;
    }
  }
}
