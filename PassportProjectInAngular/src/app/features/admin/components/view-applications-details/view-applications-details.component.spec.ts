import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationsDetailsComponent } from './view-applications-details.component';

describe('ViewApplicationsDetailsComponent', () => {
  let component: ViewApplicationsDetailsComponent;
  let fixture: ComponentFixture<ViewApplicationsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewApplicationsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewApplicationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
