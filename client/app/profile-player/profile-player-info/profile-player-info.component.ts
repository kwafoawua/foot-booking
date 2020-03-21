import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  moduleId: module.id,
  templateUrl: 'profile-player-info.component.html'
})

export class ProfilePlayerInfoComponent implements OnInit {

  userForm: FormGroup;
  username: string;
  user: any = {};

  constructor(
    private rout: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.createForm();
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    this.getUser(this.username);
  }

  private createForm() {
    this.userForm = this.fb.group({
      username: null,
      email: null,
      _id: null
    });
  }

  private getUser(username: string) {
    this.userService.getByUsername(username).subscribe(player => {
      this.user.username = player.username;
      this.user.email = player.email;
      this.user._id = player._id;

      this.userForm.setValue({
        username: this.user.username,
        email: this.user.email,
        _id: this.user._id
      })
    });
  }

  updateEmail() {
    let user = this.userForm.value;
    this.userService.updateEmail(user)
      .subscribe(
        data => {
          this.alertService.success('El email se modificó con éxito', true);
        },
        error => {
          this.alertService.error(error);
        });
  }

  onSubmit() {
    let form = this.userForm.value;
  }
}
