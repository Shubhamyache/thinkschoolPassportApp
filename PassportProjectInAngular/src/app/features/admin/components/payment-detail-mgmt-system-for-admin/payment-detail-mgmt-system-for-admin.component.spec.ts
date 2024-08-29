import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailMgmtSystemForAdminComponent } from './payment-detail-mgmt-system-for-admin.component';

describe('PaymentDetailMgmtSystemForAdminComponent', () => {
  let component: PaymentDetailMgmtSystemForAdminComponent;
  let fixture: ComponentFixture<PaymentDetailMgmtSystemForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDetailMgmtSystemForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentDetailMgmtSystemForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
