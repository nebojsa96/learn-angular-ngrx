import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmComponent } from './email-confirm.component';

describe('EmailConfirmComponent', () => {
  let component: EmailConfirmComponent;
  let fixture: ComponentFixture<EmailConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailConfirmComponent]
    });
    fixture = TestBed.createComponent(EmailConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
