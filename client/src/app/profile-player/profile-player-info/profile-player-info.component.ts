import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_services/alert.service';
import { AuthService, PlayerService } from '../../_services';
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
    private playerService: PlayerService,
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
    const userEmail = this.userForm.get('email').value;
    const _id = this.userForm.get('_id').value;
    console.log(userEmail);
    if(this.userForm.valid) {
      console.log('asd');
      this.authService.updateEmail(userEmail).then((response) => {
        this.playerService.update({_id, email: userEmail }).subscribe((data) => {
          this.alertService.success('Email actualizado con éxito.');
        }, error => this.alertService.error('Hubo un error al actualizar el email'));
      }).catch(error => this.alertService.error('Hubo un error al actualizar el email'));
    } else {
      this.alertService.error('Hubo un error al actualizar el email');
    }
  }

  onSubmit() {
    let form = this.userForm.value;
  }
}
