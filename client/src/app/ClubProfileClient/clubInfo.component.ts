import {Component, Input, OnInit} from '@angular/core';
import {Club} from '../_models';
import {environment} from '../../environments/environment';
import * as moment from 'moment';
import {ClubService} from '../_services';
import {ActivatedRoute} from '@angular/router';
import {TournamentService} from '../_services/tournament.service';
import {Tournament} from '../_models/tournament';

@Component({
  templateUrl: './clubInfo.component.html',
  selector: 'club-info',
})

export class ClubInfoComponent implements OnInit{
 club: Club;
  uploadsBaseURL = environment.uploadsBaseURL;
  galery: string[];
  loading = false;
  public myTournament: Tournament[];
  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute,
    private tournamentService: TournamentService) {
  }

  ngOnInit(): void {
    this.getClub(this.route.snapshot.params.id);
    this.getMyTournament();
  }

  private getClub(_id: string) {
    this.loading = true;
    this.clubService.getResultById(_id).subscribe(club => {
      this.club = club;
      this.galery = club.galleryImg;
      this.loading = false;
    });
  }

  getMyTournament(){
    this.tournamentService.getMyTournaments(this.route.snapshot.params.id).subscribe((data: any) => {
      this.myTournament = data.tournament;
    }, error => console.log(error));

  }

}
