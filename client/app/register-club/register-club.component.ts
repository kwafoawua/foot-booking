import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';



import { AlertService, ClubService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register-club.component.html'
})

export class RegisterClubComponent {
    model: any = {};
    loading = false;
    registerClubForm: FormGroup;

    constructor(
        private router: Router,
        private clubService: ClubService,
        private alertService: AlertService,
        private fb: FormBuilder) {
        this.createForm();
    }

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

    createForm()  {
        this.registerClubForm = this.fb.group({
            user: this.fb.group({
                username: '',
                email: '',
                password: ''
            }),
            name: '',
            description: '',
            phoneNumber: '',
            address: '',
            services: [],
            profileImg: '',
            galleryImg: '',
            field: this.fb.group({
                fieldName: '',
                services: [],
                fieldImg: ''
            }),
            socialMedia: this.fb.group({
                facebookId: '',
                twitterId: '',
                instagramId: '',
                googleId: ''

            })
        });

}
}
