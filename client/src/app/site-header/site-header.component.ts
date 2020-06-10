import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-site-header',
  templateUrl: 'site-header.component.html',
  styleUrls: [ 'site-header.component.css' ]
})

export class SiteHeaderComponent implements OnInit {
  currentUser: any;
  name = '';

  constructor(public auth: AuthService, private router: Router, private storageService: StorageService) {
  }

  ngOnInit() {
    this.storageService.getStorage('currentUser').subscribe(user => {
      console.log('site header', user);
      if (user.value) {
        this.currentUser = user.value;
        this.name = user.value.name;
      }
    });
  }

  isClubUser(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      return user.rol === 'Club';
    }
  }

  isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return !!user;
  }

  public goToProfile() {
    console.log(this.currentUser.rol);
    if (this.currentUser.rol === 'Club') {
      this.router.navigate([ '/profile-club', this.currentUser._id ]);
    } else {
      this.router.navigate([ '/profile-player', this.currentUser._id ]);
    }
  }

  public goToMisReservas() {
    this.router.navigate([ '/player/mis-reservas' ]);
  }

  public goToDashboard() {
    this.router.navigate([ '/club/estadisticas' ]);
  }

}
