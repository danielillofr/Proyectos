import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraFasesComponent } from './barra-fases.component';

describe('BarraFasesComponent', () => {
  let component: BarraFasesComponent;
  let fixture: ComponentFixture<BarraFasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraFasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraFasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
