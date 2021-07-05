import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilFabComponent } from './perfil-fab.component';

describe('PerfilFabComponent', () => {
  let component: PerfilFabComponent;
  let fixture: ComponentFixture<PerfilFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilFabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
