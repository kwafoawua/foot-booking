import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { ClubService } from '../../_services/club.service';
import { Router } from '@angular/router';
import { FieldFormArrayComponent } from '../../fields-array';
import { ValidateAllFields } from '../../_helpers/index';
import { forEach } from '@angular/router/src/utils/collection';
import {MatSnackBar} from "@angular/material/snack-bar";

/**
 * Created by pablo on 6/11/2017.
 */
@Component({
  templateUrl: 'profile-club-canchas.component.html'
})

export class ProfileClubCanchasComponent implements OnInit {

  fieldClubForm: FormGroup;
  user: any = {};
  club: any = {};
  id: string;
  loading: false;
  fields: any = [];

  /*Fields for Update, Delete, Insert*/
  deletedFields: any = [];
  modifiedFields: any = [];
  newFields: any = [];

  constructor(
    private router: Router,
    private clubService: ClubService,
    private alertService: AlertService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar) {
  }


  ngOnInit() {
    this.createForm(1);
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getClub(this.id);
  }

  createForm(cantFields: number) {
    this.fieldClubForm = this.fb.group({
      fields: FieldFormArrayComponent.initFields(cantFields),
    });
  }

  private getClub(id: string) {
    this.clubService.getById(id).subscribe(userClub => {

      this.club = userClub;
      // console.log(this.club);
      this.createForm(this.club.fields.length);
      this.fieldClubForm.patchValue({
        fields: this.club.fields
      });
      // console.log(this.fieldClubForm);

    });
  }

  createTemporalField(field) {
    const cancha: any = {};
    cancha.fieldName = field.fieldName;
    cancha.cantPlayers = field.cantPlayers;
    cancha.fieldType = field.fieldType;
    cancha.services = field.services;
    cancha.price = field.price;
    if (field._id !== '') {
      cancha._id = field._id;
    }

    return cancha;
  }

  updateFieldData() {
    if (this.fieldClubForm.valid) {
      let index = 0;
      for (let field of this.fieldClubForm.controls[ 'fields' ].value) {

        let fieldFormDirty = (<FormArray>this.fieldClubForm.controls[ 'fields' ]).controls[ index ].dirty;

        if (fieldFormDirty && field._id != '') {
          let cancha = this.createTemporalField(field);
          this.modifiedFields.push(cancha);
        } else if (field._id == '') {
          let cancha = this.createTemporalField(field);
          this.newFields.push(cancha);
        }

        index++;
        // console.log(field);

      }
      let canchas: any = {};
      canchas.modifiedFields = this.modifiedFields;
      canchas.deletedFields = this.deletedFields;
      canchas.newFields = this.newFields;

      console.log(canchas);
      this.clubService.updateFields(this.club._id, canchas).subscribe(
        data => {
          this.snackBar.open('Se actualizó con éxito', null, {
            duration: 2000
          });
          this.alertService.success('Los datos se actualizaron correctamente', true);
        },
        error => {
          this.snackBar.open(error, null, {
            duration: 2000
          });
          this.alertService.error(error);
          this.loading = false;
        });

    }

    this.fields = [];
    this.modifiedFields = [];
    this.newFields = [];
  }

  setDeletedFields($event) {
    this.deletedFields.push($event);
    console.log(this.deletedFields);
  }

}
