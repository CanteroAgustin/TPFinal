import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudTurnoResumenComponent } from './solicitud-turno-resumen.component';

describe('SolicitudTurnoResumenComponent', () => {
  let component: SolicitudTurnoResumenComponent;
  let fixture: ComponentFixture<SolicitudTurnoResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudTurnoResumenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudTurnoResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
