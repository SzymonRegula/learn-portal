import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerAddPageComponent } from './trainer-add-page.component';

describe('TrainerAddPageComponent', () => {
  let component: TrainerAddPageComponent;
  let fixture: ComponentFixture<TrainerAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerAddPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
