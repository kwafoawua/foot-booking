import { Component, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ClubService } from '../../_services';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DestacadosComponent {
  constructor(private clubService: ClubService) {
    this.clubService.getDestacados().subscribe((clubs: any) => this.clubs = clubs);
  }
  clubs: any[];
}
