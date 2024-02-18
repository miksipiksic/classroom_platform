import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramHistogramComponent } from './diagram-histogram.component';

describe('DiagramHistogramComponent', () => {
  let component: DiagramHistogramComponent;
  let fixture: ComponentFixture<DiagramHistogramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagramHistogramComponent]
    });
    fixture = TestBed.createComponent(DiagramHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
