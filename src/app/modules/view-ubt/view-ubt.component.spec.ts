import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUbtComponent } from './view-ubt.component';

describe('ViewUbtComponent', () => {
  let component: ViewUbtComponent;
  let fixture: ComponentFixture<ViewUbtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUbtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUbtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
