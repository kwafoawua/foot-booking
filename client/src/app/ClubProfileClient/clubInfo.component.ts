import {Component, Input, OnInit} from "@angular/core";
import {Club} from "../_models";
import {environment} from "../../environments/environment";
import * as moment from "moment";
import {ClubService} from "../_services";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './clubInfo.component.html',
  selector: 'club-info',
})

export class ClubInfoComponent implements OnInit{
 club: Club;
  uploadsBaseURL = environment.uploadsBaseURL;
  galery: string[];
  constructor(private clubService: ClubService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(moment().format());
    this.getClub(this.route.snapshot.params[ 'id' ]);
  }

  private getClub(_id: string) {
    this.clubService.getResultById(_id).subscribe(club => {
      this.club = club;
      this.galery = club.galleryImg;
    });
  }

}
