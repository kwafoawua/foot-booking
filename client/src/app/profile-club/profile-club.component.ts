import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, AlertService } from '../_services/index';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  templateUrl: 'profile-club.component.html',
})
export class ProfileClubComponent implements OnInit {
  user: any = {};
  //  user: Observable<any>;
  club: any = {};
  username: string;
  uploadsBaseURL = environment.uploadsBaseURL;

  //user: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    //private clubService: ClubService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    /* this.userService.getByUsername(this.username);
     this.userService.usuario$.subscribe(
         userClub => {
             this.user.username = userClub.username;
                 this.user.email = userClub.email;
                 this.user._id = userClub._id;
                 this.club = userClub.creator
         });

 }*/


    this.getUserAndClub(this.username);
    //this.user = this.userService.user;
    //this.userService.getByUsername(this.username);
  }

  public goToInfo() {
    this.router.navigate([ './info' ], { relativeTo: this.route });
  }

  public goToUser() {
    this.router.navigate([ './' ], { relativeTo: this.route });
  }

  public goToPassword() {
    this.router.navigate([ './password' ], { relativeTo: this.route });
  }

  public goToFields() {
    this.router.navigate([ './canchas' ], { relativeTo: this.route });
  }

  private getUserAndClub(username: string) {
    this.userService.getByUsername(username).subscribe(userClub => {
      console.log(userClub);
      this.user.username = userClub.username,
        this.user.email = userClub.email,
        this.user._id = userClub._id,
        this.club = userClub.creator
    });
  }


}