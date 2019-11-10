import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OprationComponent } from './opration.component';

describe('OprationComponent', () => {
  let component: OprationComponent;
  let fixture: ComponentFixture<OprationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OprationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OprationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
