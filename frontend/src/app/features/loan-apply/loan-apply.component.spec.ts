import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApplyComponent } from './loan-apply.component';

describe('LoanApplyComponent', () => {
  let component: LoanApplyComponent;
  let fixture: ComponentFixture<LoanApplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoanApplyComponent]
    });
    fixture = TestBed.createComponent(LoanApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
