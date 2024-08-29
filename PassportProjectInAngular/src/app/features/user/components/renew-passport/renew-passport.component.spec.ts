import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewPassportComponent } from './renew-passport.component';

describe('RenewPassportComponent', () => {
  let component: RenewPassportComponent;
  let fixture: ComponentFixture<RenewPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewPassportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenewPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
