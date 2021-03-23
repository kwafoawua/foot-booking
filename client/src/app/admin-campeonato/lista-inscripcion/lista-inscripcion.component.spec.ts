import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInscripcionComponent } from './lista-inscripcion.component';

describe('ListaInscripcionComponent', () => {
  let component: ListaInscripcionComponent;
  let fixture: ComponentFixture<ListaInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
