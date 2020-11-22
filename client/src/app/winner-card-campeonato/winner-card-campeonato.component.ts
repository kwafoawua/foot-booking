import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-winner-card-campeonato',
  templateUrl: './winner-card-campeonato.component.html',
  styleUrls: ['./winner-card-campeonato.component.css']
})
export class WinnerCardCampeonatoComponent implements OnInit {

  @Input() primerPremio: string;
  @Input() segundoPremio: string;
  @Input() tercerPremio: string;
  @Input() primerEquipo: string;
  @Input() segundoEquipo: string;
  @Input() tercerEquipo: string;
  constructor() { }

  ngOnInit() {
  }

}
