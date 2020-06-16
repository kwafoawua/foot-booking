import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, AlertService, ClubService } from '../_services/index';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: 'profile-club.component.html',
})
export class ProfileClubComponent implements OnInit {
  user: any = {};
  //  user: Observable<any>;
  club: any = {};
  id: string;
  uploadsBaseURL = environment.uploadsBaseURL;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clubService: ClubService
  ) {
  }

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getClub(this.id);
  }

  public goToInfo() {
    this.router.navigate([ './' ], { relativeTo: this.route });
  }

  public goToPassword() {
    this.router.navigate([ './password' ], { relativeTo: this.route });
  }

  public goToFields() {
    this.router.navigate([ './canchas' ], { relativeTo: this.route });
  }

  private getClub(id: string) {
    this.clubService.getById(id).subscribe(userClub => {
      console.log(userClub);
      this.club = userClub;
    });
  }


}
