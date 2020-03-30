import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-site-header',
  moduleId: module.id,
  templateUrl: 'site-header.component.html',
  styleUrls: [ 'site-header.component.css' ]
})

export class SiteHeaderComponent implements OnInit {
  currentUser: any;
  username: string;

  constructor(private auth: AuthenticationService, private router: Router) {
    auth.isAuthenticated();
    auth.isUserClub();
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != undefined) {
      this.username = this.currentUser.username;
    }
  }

  public goToProfile() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser.rol);
    if (currentUser.rol === 'Club') {
      this.router.navigate([ '/profile-club', currentUser.playerOrClubId ]);
    } else {
      this.router.navigate([ '/profile-player', currentUser.playerOrClubId ]);
    }
  }

  public goToMisReservas() {
    this.router.navigate([ '/player/mis-reservas' ]);
  }

  public goToDashboard() {
    this.router.navigate([ '/club/estadisticas' ]);
  }

}
