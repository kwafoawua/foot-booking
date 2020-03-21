import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/index';
import { AlertService } from '../_services/index';


@Component({
  moduleId: module.id,
  templateUrl: 'profile-player.component.html',
})

export class ProfilePlayerComponent implements OnInit {
  currentUser: User;

  constructor(private route: ActivatedRoute,
              private alertService: AlertService,
              private router: Router) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  public goToUser() {
    this.router.navigate([ './' ], { relativeTo: this.route });
  }

  public goToEdit() {
    this.router.navigate([ './edit' ], { relativeTo: this.route });
  }

  public goToConfig() {
    this.router.navigate([ './config' ], { relativeTo: this.route });
  }
}
