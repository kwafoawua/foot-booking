import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { Observable } from 'rxjs';
import { AlertService } from '../../_services/alert.service';

@Component({
  templateUrl: 'profile-club-user.component.html'
})
export class ProfileClubUserComponent implements OnInit {

  userForm: FormGroup;
  username: string;
  user: any = {};

  //user: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private userService: UserService) {
    //this.createForm();
  }

  ngOnInit() {
    this.createForm();
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    this.getUser(this.username);
  }

  private getUser(username: string) {
    this.userService.getByUsername(username).subscribe(userClub => {

      this.user.username = userClub.username;
      this.user.email = userClub.email;
      this.user._id = userClub._id;
      this.userForm.setValue({ username: this.user.username, email: this.user.email, _id: this.user._id })
    });
  }

  private createForm() {
    //console.log(this.user.username);
    this.userForm = this.fb.group({
      username: null,
      email: null,
      _id: null
    });
  }

  updateEmail() {
    let user = this.userForm.value;
    console.log(user);
    this.userService.updateEmail(user)
      .subscribe(
        data => {
          this.alertService.success('El email se modificó con éxito', true);
        },
        error => {
          this.alertService.error(error);
        });
  }

  onSubmit(): void {
    // console.log('Sibling1Component-received from sibling2: ' + this._sharedService.subscribeData());
    console.log('Form submitted-sibling1Form');
    let form = this.userForm.value;
    //this.searchCaseNumber = caseNumber;

  }

}
