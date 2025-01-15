import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleDTO } from '../../../dtos/dtos'; // Assurez-vous que ce chemin est correct

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'http://localhost:8080/vehicles'; // Ajustez l'URL selon votre configuration

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllVehicles(): Observable<VehicleDTO[]> {
    return this.http.get<VehicleDTO[]>(this.baseUrl);
  }

  getVehiclesByAgencyId(agencyId: number): Observable<VehicleDTO[]> {
    return this.http.get<VehicleDTO[]>(`${this.baseUrl}/${agencyId}`)
  }

  getVehicleById(id: number): Observable<VehicleDTO> {
    return this.http.get<VehicleDTO>(`${this.baseUrl}/${id}`);
  }

  createVehicle(vehicle: VehicleDTO): Observable<void> {
    return this.http.post<void>(this.baseUrl, vehicle, this.httpOptions);
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
