import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../_helpers/index';
import { AlertService } from '../../_services/alert.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../_services';

@Component({
  templateUrl: 'profile-club-password.component.html'
})
export class ProfileClubPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  repeatPassword: string;
  username: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authService: AuthService,
    public snackBar: MatSnackBar ) {}

  ngOnInit() {
    this.createForm();
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  private createForm() {
    this.passwordForm = this.fb.group({
      password: [ null, Validators.compose([ Validators.required, Validators.minLength(8) ]) ],//falta validar contraseña
      repeatPassword: [ null, Validators.compose([ Validators.required ]) ]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }

  updatePassword() {
    const password = this.passwordForm.value.password;
    this.authService.updatePassword(password)
      .then(
        data => {
          this.snackBar.open('El club se actualizó con éxito', null, {
            duration: 2000
          });
        }).catch(
        error => {
          this.snackBar.open(error, null, {
            duration: 2000
          });
        });
  }

}
