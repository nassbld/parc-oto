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
export class HomeComponent {

}
