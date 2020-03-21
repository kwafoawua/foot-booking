import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../_helpers/index';
import { AlertService } from '../../_services/alert.service';
import { UserService } from '../../_services/user.service';

@Component({
  moduleId: module.id,
  templateUrl: 'profile-player-config.component.html'
})

export class ProfilePlayerConfigComponent implements OnInit {
  passwordForm: FormGroup;
  repeatPassword: string;
  username: string;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.createForm();
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  private createForm() {
    this.passwordForm = this.fb.group({
      password: [ null, Validators.compose([ Validators.required, Validators.minLength(8) ]) ],
      repeatPassword: [ null, Validators.compose([ Validators.required ]) ]
    }, { validator: PasswordValidation.MatchPassword });
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      let password = this.passwordForm.value.password;
      let user = {
        password: password,
        username: this.username
      };
      this.userService.updatePassword(user)
        .subscribe(
          data => {
            this.alertService.success('La password se modificó con éxito', true);
          },
          error => {
            this.alertService.error(error);
          });
    }
    this.alertService.error('Ups! Hubo un problema en la validación, revise los campos ingresados', false);
  }
}
