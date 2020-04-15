import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, PlayerService } from '../_services/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PasswordValidation, ValidateAllFields } from '../_helpers';

@Component({
  templateUrl: 'register-player.component.html'
})

export class RegisterPlayerComponent implements OnInit {

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private playerService: PlayerService,
    private alertService: AlertService) {
  }

  registerForm : FormGroup;
  loading = false;

  ngOnInit(): void {
    this.registerForm =this.fb.group({
      name: [ '', Validators.required ],
      lastName: [ '', Validators.required ],
      email: [null, Validators.compose([ Validators.required, CustomValidators.email ])],
      username: [null, Validators.required],
      password: [ null, Validators.compose([ Validators.required, Validators.minLength(8) ]) ],
      repeatPassword: [ null, Validators.compose([ Validators.required, Validators.minLength(8) ]) ]
    },{
      validator: PasswordValidation.MatchPassword // your validation method
    })
  }

  registerPlayer() {
    if(this.registerForm.valid) {
      this.loading = true;
      this.playerService.create(this.registerForm.value)
        .subscribe(
          data => {
            this.alertService.success('Registración Exitosa', true);
            this.router.navigate([ '/login' ]);
          },
          error => {
            console.log(error);
            this.alertService.error(error.error.errorMessage);
            this.loading = false;
          });
    } else {
      ValidateAllFields.validateAllFields(this.registerForm);
    }
  }
}
