import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../_services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-campeonato',
  templateUrl: './detalle-campeonato.component.html',
  styleUrls: ['./detalle-campeonato.component.css']
})
export class DetalleCampeonatoComponent implements OnInit {

  tournamentId: string;
  inscriptions: any;
  inscriptionsCount: number;
  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.tournamentId = this.route.snapshot.params[ 'id' ];
    if (this.tournamentId) {
      this.getInscriptions();
    }
  }

  getInscriptions() {
    this.tournamentService.getAllInscriptions(this.tournamentId).subscribe((data: any) => {
      this.inscriptions = data.inscriptions;
      this.inscriptionsCount = data.inscriptions.length;

    });
  }

}
