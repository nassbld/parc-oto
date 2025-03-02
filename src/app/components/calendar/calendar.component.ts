import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarModule,
  DateAdapter,
  CalendarUtils,
  CalendarA11y,
  CalendarDateFormatter, CalendarEventTitleFormatter
} from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MonthViewDay } from 'calendar-utils';
import { addMonths, format, subMonths } from 'date-fns';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { fr } from 'date-fns/locale';
import { CustomDateFormatter } from '../../services/custom-date-formatter/custom-date-formatter.service';
import {ReservationDTO, ReservationWithInfosDTO, UserDTO} from '../../dtos/dtos';
import {UserService} from '../../services/api/user-service/user.service';
import {forkJoin, map} from 'rxjs';

registerLocaleData(localeFr, 'fr');

interface EventMetadata {
  userName: string;
  vehicleBrandAndModel: string;
  vehicleLicensePlate: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory
    },
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    CalendarUtils,
    CalendarA11y,
    CalendarEventTitleFormatter
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit, OnChanges  {
  eventsLoaded: boolean = false;

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  @Input() reservations!: ReservationWithInfosDTO[];

  events: CalendarEvent[] = [];

  CalendarView = CalendarView;

  ngOnInit() {
    this.updateEvents();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reservations'] && this.reservations) {
      this.updateEvents();
    }
  }

  private updateEvents() {
    this.events = this.reservations.map(reservation => ({
      start: new Date(reservation.start),
      end: new Date(reservation.end),
      title: `${reservation.userFirstName} ${reservation.userLastName}`,
      meta: {
        vehicleBrandAndModel: `${reservation.vehicleBrand} ${reservation.vehicleModel}`,
        vehicleLicensePlate: `${reservation.vehicleLicensePlate}`
      },
      color: { primary: '#c41b1b', secondary: '#FFCDD2' }
    }));
    this.eventsLoaded = true;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ day }: { day: MonthViewDay<CalendarEvent> }): void {
    console.log('Jour cliqué :', day.date, day.events);
  }

  capitalizeFirstLetter(day: string): string {
    return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  }

  getFormattedDays(): string[] {
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    return days.map(day => this.capitalizeFirstLetter(day));
  }
}
