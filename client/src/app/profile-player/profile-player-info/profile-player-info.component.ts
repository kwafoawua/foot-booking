import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_services/alert.service';
import { AuthService } from '../../_services';
import { StorageService } from '../../_services/storage.service';

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
    private alertService: AlertService,
    private storageService: StorageService,
    ) {
  }

  ngOnInit() {
    this.createForm();
    // TODO: modificar a llamada a la API de getPlayer, ya que localStorage no mantiene datos actualizados
    const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user) {
        this.currentUser = user;
        this.userForm.setValue({
          name: this.currentUser.name,
          email: this.currentUser.email,
          _id: this.currentUser._id,
        });
      }
  }

  private createForm() {
    this.userForm = this.fb.group({
      name: null,
      email: null,
      _id: null
    });
  }

  // TODO: cambiar a firebase + mongodb
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
