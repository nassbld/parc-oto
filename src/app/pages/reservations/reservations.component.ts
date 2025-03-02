import {Component, OnInit} from '@angular/core';
import {CalendarComponent} from "../../components/calendar/calendar.component";
import {ReservationService} from '../../services/api/reservation-service/reservation.service';
import {ReservationDTO, ReservationWithInfosDTO} from '../../dtos/dtos';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-reservations',
  standalone: true,
    imports: [
        CalendarComponent
    ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit {
  reservations: ReservationWithInfosDTO[] = [];
  agencyId: number = 1;

  constructor(private reservationService: ReservationService) {
  }

  async ngOnInit() {
    await this.getReservationsWithInfosByAgencyId(this.agencyId);
  }

  async getReservationsWithInfosByAgencyId(agencyId: number): Promise<void> {
    try {
      this.reservations = await firstValueFrom(this.reservationService.getReservationsWithInformationsByAgencyId(agencyId));
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
    }
  }

}
