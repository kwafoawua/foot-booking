﻿import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../_services';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit{
  message: any;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
      window.scrollTo(0, 0);
    });
  }

  closeAlert() {
  this.message = null;
  }
}
