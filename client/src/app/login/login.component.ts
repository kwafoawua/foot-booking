import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthService } from '../_services/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateAllFields } from '../_helpers';
import { FirebaseErrorHandler } from '../_helpers/firebaseErrorHandler';

@Component({
  templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    // this.subscribe();
    // reset login status
    this.authService.logout();
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[ 'returnUrl' ] || '/';
  }

  async login() {
    if(this.loginForm.valid) {
      this.loading = true;
      try{
        const user = await this.authService.mailLogin(this.loginForm.value);

        console.log(user);
        //if (data.rol === 'Club')
          //this.router.navigate([ '/profile-club', data.playerOrClubId ]);
        //else
          //this.router.navigate([ '', data.playerOrClubId ]);
        await this.router.navigate([ '/home' ]);
      } catch (err){
        const error = FirebaseErrorHandler.signInErrorHandler(err.code);
        this.alertService.error(error);
        this.loading = false;
      }
    } else {
      ValidateAllFields.validateAllFields(this.loginForm);
    }

  }

  public goToRegister() {
    this.router.navigate([ '/player/register' ]);
  }

  public validateInput(inputName: string) {
    return this.loginForm.get(inputName).invalid &&
      (this.loginForm.get(inputName).dirty || this.loginForm.get(inputName).touched);
  }
}
