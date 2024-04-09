import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationVerificationPageComponent } from './registration-verification-page.component';

describe('RegistrationVerificationPageComponent', () => {
  let component: RegistrationVerificationPageComponent;
  let fixture: ComponentFixture<RegistrationVerificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationVerificationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
