import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingReservationCardComponent } from './incoming-reservation-card.component';

describe('ComingReservationCardComponent', () => {
  let component: IncomingReservationCardComponent;
  let fixture: ComponentFixture<IncomingReservationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomingReservationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomingReservationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
