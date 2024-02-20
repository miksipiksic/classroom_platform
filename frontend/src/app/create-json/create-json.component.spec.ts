import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJSONComponent } from './create-json.component';

describe('CreateJSONComponent', () => {
  let component: CreateJSONComponent;
  let fixture: ComponentFixture<CreateJSONComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateJSONComponent]
    });
    fixture = TestBed.createComponent(CreateJSONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
