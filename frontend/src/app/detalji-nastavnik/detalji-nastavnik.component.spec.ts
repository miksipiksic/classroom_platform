import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiNastavnikComponent } from './detalji-nastavnik.component';

describe('DetaljiNastavnikComponent', () => {
  let component: DetaljiNastavnikComponent;
  let fixture: ComponentFixture<DetaljiNastavnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetaljiNastavnikComponent]
    });
    fixture = TestBed.createComponent(DetaljiNastavnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
