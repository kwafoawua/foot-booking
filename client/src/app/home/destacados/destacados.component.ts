import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../_services';
import { Club } from '../../_models';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css']
})
export class DestacadosComponent implements OnInit {

  constructor(private clubService: ClubService) { }

  clubs: any[];

  ngOnInit() {
    this.clubService.getAll().subscribe((clubs: any) => this.clubs = clubs);
  }

}
