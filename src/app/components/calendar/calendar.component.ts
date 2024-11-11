import { Component } from '@angular/core';
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

registerLocaleData(localeFr, 'fr');

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


export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Événement exemple',
      color: { primary: '#1e90ff', secondary: '#D1E8FF' }
    },
    {
      start: new Date(),
      title: 'Événement exemple',
      color: { primary: '#1e90ff', secondary: '#D1E8FF' }
    }
  ];

  CalendarView = CalendarView;

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
