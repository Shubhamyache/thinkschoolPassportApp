import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewApplicantDetailsComponent } from './applicant-details.component';

describe('ApplicantDetailsComponent', () => {
  let component: RenewApplicantDetailsComponent;
  let fixture: ComponentFixture<RenewApplicantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewApplicantDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RenewApplicantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
