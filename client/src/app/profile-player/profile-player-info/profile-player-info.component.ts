import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';
import { AuthService } from '../../_services';

@Component({
  templateUrl: 'profile-player-info.component.html'
})

export class ProfilePlayerInfoComponent implements OnInit {

  userForm: FormGroup;
  currentUser: any;
  name: string;
  user: any = {};

  constructor(
    private rout: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
    this.createForm();
  }

  private createForm() {
    this.userForm = this.fb.group({
      name: null,
      email: null,
      _id: null
    });

    this.userForm.setValue({
      name: this.currentUser.name,
      email: this.currentUser.email,
      _id: this.currentUser._id,
    })
  }

  // TODO: cambiar a firebase
  updateEmail() {
    let user = this.userForm.value;
    /* this.userService.updateEmail(user)
      .subscribe(
        data => {
          this.alertService.success('El email se modificó con éxito', true);
        },
        error => {
          this.alertService.error(error);
        }); */
  }

  onSubmit() {
    let form = this.userForm.value;
  }
}
