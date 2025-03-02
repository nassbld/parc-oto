import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {VehicleDTO, VehicleIdentityDTO} from '../../../dtos/dtos';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'http://localhost:8080/vehicles';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllVehicles(): Observable<VehicleDTO[]> {
    return this.http.get<VehicleDTO[]>(this.baseUrl);
  }

  getVehiclesByAgencyId(agencyId: number): Observable<VehicleDTO[]> {
    return this.http.get<VehicleDTO[]>(`${this.baseUrl}/agency/${agencyId}`)
  }

  getVehiclesIdentityByAgencyId(agencyId: number): Observable<VehicleIdentityDTO[]> {
    return this.http.get<VehicleIdentityDTO[]>(`${this.baseUrl}/identity/agency/${agencyId}`)
  }

  getVehicleById(id: number): Observable<VehicleDTO> {
    return this.http.get<VehicleDTO>(`${this.baseUrl}/${id}`);
  }

  getVehicleIdentityById(id: number): Observable<VehicleIdentityDTO> {
    return this.http.get<VehicleIdentityDTO>(`${this.baseUrl}/identity/${id}`);
  }

  createVehicle(vehicle: VehicleDTO): Observable<void> {
    return this.http.post<void>(this.baseUrl, vehicle, this.httpOptions);
  }

  updateVehicle(id: number, vehicle: VehicleDTO): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update/${id}`, vehicle)
  }

  safeDeleteVehicle(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/safe-delete/${id}`, {});
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
