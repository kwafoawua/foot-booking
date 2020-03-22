import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, PlayerService } from '../_services/index';

@Component({
  moduleId: module.id,
  //selector: playerForm,
  templateUrl: 'register-player.component.html'
})

export class RegisterPlayerComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private alertService: AlertService) {
  }

//    submitted = false;
//    onSubmit() { this.submitted = true; }

  registerPlayer() {
    this.loading = true;
    this.playerService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registración Exitosa', true);
          this.router.navigate([ '/login' ]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
