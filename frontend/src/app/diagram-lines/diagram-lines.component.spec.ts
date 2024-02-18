import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramLinesComponent } from './diagram-lines.component';

describe('DiagramLinesComponent', () => {
  let component: DiagramLinesComponent;
  let fixture: ComponentFixture<DiagramLinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagramLinesComponent]
    });
    fixture = TestBed.createComponent(DiagramLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
