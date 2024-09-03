import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviousApplicationComponent } from '../../apply-for-new-passport/apply-for-new-passport/previous-application/previous-application.component';

describe('PreviousApplicationComponent', () => {
  let component: PreviousApplicationComponent;
  let fixture: ComponentFixture<PreviousApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviousApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
