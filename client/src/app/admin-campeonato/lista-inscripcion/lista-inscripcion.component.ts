import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-inscripcion',
  templateUrl: './lista-inscripcion.component.html',
  styleUrls: ['./lista-inscripcion.component.css']
})
export class ListaInscripcionComponent implements OnInit {

  @Input() inscriptions: any[];
  constructor() { }

  ngOnInit() {
  }

}
