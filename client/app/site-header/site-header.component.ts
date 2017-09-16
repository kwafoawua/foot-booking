import { Component, OnInit } from '@angular/core';

//import { User } from '../models/user';
//import { Observable } from 'rxjs/Observable';
//import { Config } from '../index';
//import { AuthCookie } from '../services/auth-cookies-handler';
import {} from '@angular/http';
import 'rxjs/add/operator/map';

//import {isNullOrUndefined, isUndefined} from "util";


@Component({
  selector: 'app-site-header',
  moduleId: module.id,
  templateUrl: 'site-header.component.html',
  styleUrls: ['site-header.component.css']
})

export class SiteHeaderComponent implements OnInit {
  currentUser: string;
  username: string;


  constructor() {

      this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    // this.username='';
      //this.obs=obs.subscribe(value => console.log(value));
    if(this.currentUser != undefined){
      this.username = this.currentUser.username;

    }
    }

  ngOnInit() {

    }

}
