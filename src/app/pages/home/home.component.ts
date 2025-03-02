import {Component, OnInit} from '@angular/core';
import {CarSummaryCardComponent} from '../../components/car-summary-card/car-summary-card.component';
import {
  IncomingReservationCardComponent
} from '../../components/incoming-reservation-card/incoming-reservation-card.component';
import {ReservationDTO, VehicleDTO, VehicleIdentityDTO} from '../../dtos/dtos';
import {VehicleService} from '../../services/api/vehicle-service/vehicle.service';
import {CommonModule} from '@angular/common';
import {ReservationService} from '../../services/api/reservation-service/reservation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarSummaryCardComponent,
    IncomingReservationCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  vehicles: VehicleIdentityDTO[] = [];
  reservations: ReservationDTO[] = [];
  agencyId: number = 1;

  constructor(private vehicleService: VehicleService,
              private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.getVehiclesIdentityByAgencyId(this.agencyId);
    this.getTodayReservationsByAgencyId(this.agencyId);
  }

  getVehiclesIdentityByAgencyId(agencyId: number): void {
    this.vehicleService.getVehiclesIdentityByAgencyId(agencyId).subscribe(
      (vehicles: VehicleIdentityDTO[]) => {
        this.vehicles = vehicles;
      },
      (error) => {
        console.error('Erreur lors de la récupération des véhicules:', error);
      }
    );
  }

  getTodayReservationsByAgencyId(agencyId: number): void {
    this.reservationService.getTodayReservationsByAgencyId(agencyId).subscribe(
      (reservations: ReservationDTO[]) => {
        this.reservations = reservations;
      },
      (error) => {
        console.error('Erreur lors de la récupération des réservations d\'aujourd\'hui:', error);
      }
    )
  }
}
