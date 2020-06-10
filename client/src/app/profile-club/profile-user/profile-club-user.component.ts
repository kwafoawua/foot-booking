import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_services/alert.service';
import { ClubService } from '../../_services';

@Component({
  templateUrl: 'profile-club-user.component.html'
})
export class ProfileClubUserComponent implements OnInit {

  userForm: FormGroup;
  id: string;
  club: any = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private clubService: ClubService) {
  }

  ngOnInit() {
    this.createForm();
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getUser(this.id);
  }

  private getUser(id: string) {
    this.clubService.getById(id).subscribe((userClub: any) => {

      this.club.name = userClub.name;
      this.club.email = userClub.email;
      this.club._id = userClub._id;
      this.userForm.setValue({ username: this.club.name, email: this.club.email, _id: this.club._id });
    });
  }

  private createForm() {
    this.userForm = this.fb.group({
      name: null,
      email: null,
      _id: null
    });
  }

  updateEmail() {
  }

  onSubmit(): void {
    // console.log('Sibling1Component-received from sibling2: ' + this._sharedService.subscribeData());
    console.log('Form submitted-sibling1Form');
    let form = this.userForm.value;
    //this.searchCaseNumber = caseNumber;

  }

}
