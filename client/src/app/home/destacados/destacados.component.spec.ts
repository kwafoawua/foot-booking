import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestacadosComponent } from './destacados.component';

describe('DestacadosComponent', () => {
  let component: DestacadosComponent;
  let fixture: ComponentFixture<DestacadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestacadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestacadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
