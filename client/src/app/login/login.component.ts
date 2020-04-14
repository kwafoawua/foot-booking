import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    // this.subscribe();
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[ 'returnUrl' ] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          if (data.rol == 'Club')
            this.router.navigate([ '/profile-club', data.playerOrClubId ]);
          else
            this.router.navigate([ '', data.playerOrClubId ]);
          /*
          else
              this.router.navigate(['/home']);
          */
        },
        error => {
          console.log(error);
          this.alertService.error(error.error);
          this.loading = false;
        });
  }

  public goToRegister() {
    this.router.navigate([ '/player/register' ]);
  }
}
