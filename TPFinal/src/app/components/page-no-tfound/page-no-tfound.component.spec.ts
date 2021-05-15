import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNoTFoundComponent } from './page-no-tfound.component';

describe('PageNoTFoundComponent', () => {
  let component: PageNoTFoundComponent;
  let fixture: ComponentFixture<PageNoTFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNoTFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNoTFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
