import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramPieComponent } from './diagram-pie.component';

describe('DiagramPieComponent', () => {
  let component: DiagramPieComponent;
  let fixture: ComponentFixture<DiagramPieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagramPieComponent]
    });
    fixture = TestBed.createComponent(DiagramPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
