import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbtComponent } from './ubt.component';

describe('UbtComponent', () => {
  let component: UbtComponent;
  let fixture: ComponentFixture<UbtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
