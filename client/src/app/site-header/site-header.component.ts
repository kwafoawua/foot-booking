import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-site-header',
  templateUrl: 'site-header.component.html',
  styleUrls: [ 'site-header.component.css' ]
})

export class SiteHeaderComponent implements OnInit {
  currentUser: any;
  name: string = '';

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.currentUser = currentUser;
      this.name = currentUser.name;
    }
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
