import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ReservationDTO, ReservationWithInfosDTO} from '../../../dtos/dtos';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8080/reservations'; // Ajustez l'URL selon votre configuration

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(this.baseUrl);
  }

  getReservationById(id: number): Observable<ReservationDTO> {
    return this.http.get<ReservationDTO>(`${this.baseUrl}/${id}`);
  }

  getReservationsByAgencyId(agencyId: number): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(`${this.baseUrl}/agency/${agencyId}`);
  }

  getReservationsWithInformationsByAgencyId(agencyId: number): Observable<ReservationWithInfosDTO[]> {
    return this.http.get<ReservationWithInfosDTO[]>(`${this.baseUrl}/agency/informations/${agencyId}`);
  }

  getTodayReservationsByAgencyId(agencyId: number): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(`${this.baseUrl}/agency/today/${agencyId}`);
  }

  createReservation(reservation: ReservationDTO): Observable<void> {
    return this.http.post<void>(this.baseUrl, reservation, this.httpOptions);
  }

  updateReservationStatus(id: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/status`, status, this.httpOptions);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
