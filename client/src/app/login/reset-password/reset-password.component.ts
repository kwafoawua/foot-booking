import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AuthService } from '../../_services';
import { FirebaseErrorHandler } from '../../_helpers/firebaseErrorHandler';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  public validateInput(inputName: string) {
    return this.resetPasswordForm.get(inputName).invalid &&
      (this.resetPasswordForm.get(inputName).dirty || this.resetPasswordForm.get(inputName).touched);
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.loading = true;
      this.authService.forgotPassword(this.resetPasswordForm.get('email').value).then( () =>
        this.alertService.success('Te llegará un email para poder restablecer la contraseña')
      )
        .catch(err => {
          const error = FirebaseErrorHandler.signInErrorHandler(err.code);
          this.alertService.error(error);
          this.loading = false;
        });
    }
  }

}
