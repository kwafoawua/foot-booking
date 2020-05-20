import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, AuthService, PlayerService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PasswordValidation, ValidateAllFields } from '../_helpers';
import { FirebaseErrorHandler } from '../_helpers/firebaseErrorHandler';

@Component({
  templateUrl: 'register-player.component.html'
})

export class RegisterPlayerComponent implements OnInit {

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private playerService: PlayerService,
    private alertService: AlertService,
    private authService: AuthService,
    ) {}

  registerForm : FormGroup;
  loading: boolean = false;

  ngOnInit(): void {
    this.registerForm =this.fb.group({
      name: [ '', Validators.required ],
      lastName: [ '', Validators.required ],
      email: [null, Validators.compose([ Validators.required, CustomValidators.email ])],
      password: [ null, Validators.compose([ Validators.required, Validators.minLength(8) ]) ],
      repeatPassword: [ null, Validators.compose([ Validators.required, Validators.minLength(8) ]) ],
      uid: [null],
      providerId: [null],
    },{
      validator: PasswordValidation.MatchPassword // your validation method
    })
  }

  showErrorAlert (error: string) {
    this.alertService.error(error);
    this.loading = false;
  }

  async registerPlayer() {
    if(this.registerForm.valid) {
      try{
        this.loading = true;
        const email = this.registerForm.controls['email'].value;
        const password = this.registerForm.controls['password'].value;
        const newUser = await this.authService.firebaseRegister(email, password);
        console.log(newUser);
        this.registerForm.controls['uid'].setValue(newUser.user.uid);
        this.registerForm.controls['providerId'].setValue(newUser.additionalUserInfo.providerId);

        this.playerService.create(this.registerForm.value)
          .subscribe(async data => {
            let { user, success } = <any>data;
            this.alertService.success(success, true);
            //TODO: centralizar el setCurrent y navigate en el service de auth
            await this.authService.setCurrentUser(user);
            await this.router.navigate([ '/' ]);
          },
          error => {
            console.log(error);
            this.showErrorAlert(error.error.errorMessage);
          });
      } catch(err){
        console.log(err);
        const error = FirebaseErrorHandler.signUpErrorHandler(err.code);
        this.showErrorAlert(error);
      }
    } else {
      ValidateAllFields.validateAllFields(this.registerForm);
    }
  }
}
