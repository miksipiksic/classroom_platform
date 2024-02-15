import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTeachersComponent } from './search-teachers.component';

describe('SearchTeachersComponent', () => {
  let component: SearchTeachersComponent;
  let fixture: ComponentFixture<SearchTeachersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTeachersComponent]
    });
    fixture = TestBed.createComponent(SearchTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
