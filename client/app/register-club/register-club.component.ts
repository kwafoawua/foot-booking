import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, ClubService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register-club.component.html'
})

export class RegisterClubComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private clubService: ClubService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.clubService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registración Exitosa', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
