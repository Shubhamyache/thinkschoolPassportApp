import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewPassportApplicationsForAdminComponent } from './renew-passport-applications-for-admin.component';

describe('RenewPassportApplicationsForAdminComponent', () => {
  let component: RenewPassportApplicationsForAdminComponent;
  let fixture: ComponentFixture<RenewPassportApplicationsForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewPassportApplicationsForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenewPassportApplicationsForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
