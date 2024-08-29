import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassportApplicationsForAdminComponent } from './new-passport-applications-for-admin.component';

describe('NewPassportApplicationsForAdminComponent', () => {
  let component: NewPassportApplicationsForAdminComponent;
  let fixture: ComponentFixture<NewPassportApplicationsForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPassportApplicationsForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPassportApplicationsForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
