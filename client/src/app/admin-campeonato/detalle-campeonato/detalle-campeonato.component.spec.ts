import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCampeonatoComponent } from './detalle-campeonato.component';

describe('DetalleCampeonatoComponent', () => {
  let component: DetalleCampeonatoComponent;
  let fixture: ComponentFixture<DetalleCampeonatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCampeonatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
