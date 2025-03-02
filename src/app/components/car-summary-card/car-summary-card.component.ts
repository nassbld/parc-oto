import {Component, Input} from '@angular/core';
import {VehicleIdentityDTO} from '../../dtos/dtos';

@Component({
  selector: 'app-car-summary-card',
  standalone: true,
  imports: [],
  templateUrl: './car-summary-card.component.html',
  styleUrl: './car-summary-card.component.css'
})
export class CarSummaryCardComponent {
  @Input() vehicle!: VehicleIdentityDTO;
}
