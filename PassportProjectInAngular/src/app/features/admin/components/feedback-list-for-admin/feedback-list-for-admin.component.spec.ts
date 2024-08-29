import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackListForAdminComponent } from './feedback-list-for-admin.component';

describe('FeedbackListForAdminComponent', () => {
  let component: FeedbackListForAdminComponent;
  let fixture: ComponentFixture<FeedbackListForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackListForAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackListForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
