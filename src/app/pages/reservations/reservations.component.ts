import { Component } from '@angular/core';
import {CalendarComponent} from "../../components/calendar/calendar.component";

@Component({
  selector: 'app-reservations',
  standalone: true,
    imports: [
        CalendarComponent
    ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

}
