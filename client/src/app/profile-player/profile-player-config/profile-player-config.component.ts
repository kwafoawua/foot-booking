import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../_helpers/index';
import { AlertService } from '../../_services/alert.service';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services';

@Component({
  templateUrl: './profile-player-config.component.html'
})

export class ProfilePlayerConfigComponent implements OnInit {
  passwordForm: FormGroup;
  repeatPassword: string;
  username: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
          const password = this.passwordForm.value.password;
          this.authService.updatePassword(password)
            .then(
              data => {
                this.alertService.success('La password se modificó con éxito', true);

              }).catch(
            error => {
              this.alertService.error(error);
            });
        } else {
          this.alertService.error('Ups! Hubo un problema en la validación, revise los campos ingresados', false);
        }
      }
}
