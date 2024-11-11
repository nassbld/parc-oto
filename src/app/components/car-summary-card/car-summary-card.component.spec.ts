import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSummaryCardComponent } from './car-summary-card.component';

describe('CarSummaryCardComponent', () => {
  let component: CarSummaryCardComponent;
  let fixture: ComponentFixture<CarSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarSummaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
