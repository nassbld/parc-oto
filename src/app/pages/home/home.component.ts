import { Component } from '@angular/core';
import {CarCardComponent} from "../../components/car-card/car-card.component";
import {CarSummaryCardComponent} from '../../components/car-summary-card/car-summary-card.component';
import {
  IncomingReservationCardComponent
} from '../../components/incoming-reservation-card/incoming-reservation-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarCardComponent,
    CarSummaryCardComponent,
    IncomingReservationCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  vehicles: VehicleDTO[] = []; // Propriété pour stocker les véhicules
  agencyId: number = 1; // Remplacez par l'ID de l'agence que vous souhaitez utiliser

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.getVehiclesByAgencyId(this.agencyId);
  }

  getVehiclesByAgencyId(agencyId: number): void {
    this.vehicleService.getVehiclesByAgencyId(agencyId).subscribe(
      (vehicles: VehicleDTO[]) => {
        this.vehicles = vehicles; // Stocke les véhicules récupérés
      },
      (error) => {
        console.error('Erreur lors de la récupération des véhicules:', error);
      }
    );
  }
}
