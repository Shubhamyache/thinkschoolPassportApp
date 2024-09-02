import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewApplicationsComponent } from './renew-applications.component';

describe('RenewApplicationsComponent', () => {
  let component: RenewApplicationsComponent;
  let fixture: ComponentFixture<RenewApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
