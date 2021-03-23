import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCampeonatoComponent } from './admin-campeonato.component';

describe('AdminCampeonatoComponent', () => {
  let component: AdminCampeonatoComponent;
  let fixture: ComponentFixture<AdminCampeonatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCampeonatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
