import { Injectable } from '@angular/core';
import {CalendarDateFormatter, DateAdapter, DateFormatterParams} from 'angular-calendar';
import {endOfWeek, format, startOfWeek} from 'date-fns';
import { fr } from 'date-fns/locale';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  constructor(public override dateAdapter: DateAdapter) {
    super(dateAdapter);
  }

  // Format pour les heures en vue de jour
  public override dayViewHour({ date, locale }: { date: Date; locale: string }): string {
    return this.formatTime(date, locale);
  }

  // Format pour les heures en vue de semaine
  public override weekViewHour({ date, locale }: { date: Date; locale: string }): string {
    return this.formatTime(date, locale);
  }

  // Méthode pour formater l'heure
  private formatTime(date: Date, locale: string): string {
    return new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
  }

  // Méthode pour le titre des jours de la semaine
  public override dayViewTitle({ date, locale }: { date: Date; locale: string }): string {
    const day = format(date, 'EEEE d MMMM yyyy', { locale: fr });
    return this.capitalizeFirstLetter(day);
  }

  public override weekViewTitle({ date, locale, weekStartsOn, excludeDays }: DateFormatterParams): string {
    const start = startOfWeek(date, { locale: fr }); // Détermine le début de la semaine
    const end = endOfWeek(date, { locale: fr }); // Détermine la fin de la semaine

    return `Semaine du ${format(start, 'd MMMM', { locale: fr })} au ${format(end, 'd MMMM yyyy', { locale: fr })}`;
  }

  public override monthViewTitle({ date, locale }: { date: Date; locale: string }): string {
    const month = format(date, 'MMMM yyyy', { locale: fr });
    return this.capitalizeFirstLetter(month);
  }

  public override  monthViewColumnHeader({date, locale}: DateFormatterParams): string {
    const day = format(date, 'EEEE', { locale: fr });
    return this.capitalizeFirstLetter(day);
  }

  public override  weekViewColumnHeader({date, locale}: DateFormatterParams): string {
    const day = format(date, 'EEEE', { locale: fr });
    return this.capitalizeFirstLetter(day);
  }

  private capitalizeFirstLetter(day: string): string {
    return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  }
}
