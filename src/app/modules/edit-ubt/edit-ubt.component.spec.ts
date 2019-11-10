import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUbtComponent } from './edit-ubt.component';

describe('EditUbtComponent', () => {
  let component: EditUbtComponent;
  let fixture: ComponentFixture<EditUbtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUbtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUbtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
