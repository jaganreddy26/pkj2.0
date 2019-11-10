import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAndUpdateCompanyComponent } from './view-and-update-company.component';

describe('ViewAndUpdateCompanyComponent', () => {
  let component: ViewAndUpdateCompanyComponent;
  let fixture: ComponentFixture<ViewAndUpdateCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAndUpdateCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAndUpdateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
