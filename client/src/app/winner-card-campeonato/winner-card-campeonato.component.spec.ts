import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerCardCampeonatoComponent } from './winner-card-campeonato.component';

describe('WinnerCardCampeonatoComponent', () => {
  let component: WinnerCardCampeonatoComponent;
  let fixture: ComponentFixture<WinnerCardCampeonatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerCardCampeonatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerCardCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
