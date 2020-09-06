import {Component, Input, OnInit} from "@angular/core";
import {Club} from "../_models";
import {environment} from "../../environments/environment";
import * as moment from "moment";
import {ClubService} from "../_services";
import {ActivatedRoute} from "@angular/router";
import {TournamentService} from "../_services/tournament.service";
import {Tournament} from "../_models/tournament";

@Component({
  templateUrl: './clubInfo.component.html',
  selector: 'club-info',
})

export class ClubInfoComponent implements OnInit{
 club: Club;
  uploadsBaseURL = environment.uploadsBaseURL;
  galery: string[];
  public myTournament: Tournament[];
  constructor(private clubService: ClubService, private route: ActivatedRoute, private tournamentService: TournamentService) {
  }

  ngOnInit(): void {
    console.log(moment().format());
    this.getClub(this.route.snapshot.params[ 'id' ]);
    this.getMyTournament();
  }

  private getClub(_id: string) {
    this.clubService.getResultById(_id).subscribe(club => {
      this.club = club;
      this.galery = club.galleryImg;
    });
  }

  getMyTournament(){
    this.tournamentService.getMyTournaments(this.route.snapshot.params[ 'id' ]).subscribe((data: any) => {
      this.myTournament = data.tournament; console.log('los datos oiiiopiopiopiopoiioioiop ' + this.myTournament.valueOf());
    }, error => console.log(error));
// //  this.collectionSize = this.myListTournament.length;
//     console.log('this.tournament' + this.myTournament);

  }

}
