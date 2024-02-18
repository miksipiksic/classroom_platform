import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramBarComponent } from './diagram-bar.component';

describe('DiagramBarComponent', () => {
  let component: DiagramBarComponent;
  let fixture: ComponentFixture<DiagramBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagramBarComponent]
    });
    fixture = TestBed.createComponent(DiagramBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
