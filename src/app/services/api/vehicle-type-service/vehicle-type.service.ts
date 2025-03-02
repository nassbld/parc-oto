import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {VehicleTypeDTO} from '../../../dtos/dtos';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  private baseUrl = 'http://localhost:8080/vehicle-types';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllVehicleTypes(): Observable<VehicleTypeDTO[]> {
    return this.http.get<VehicleTypeDTO[]>(this.baseUrl);
  }

  getVehicleTypeById(id: number): Observable<VehicleTypeDTO> {
    return this.http.get<VehicleTypeDTO>(`${this.baseUrl}/${id}`);
  }

  getVehicleTypesByBrand(brand: string): Observable<VehicleTypeDTO[]> {
    return this.http.get<VehicleTypeDTO[]>(`${this.baseUrl}/brand`, { params: { brand } });
  }

  createVehicleType(vehicleType: VehicleTypeDTO): Observable<VehicleTypeDTO> {
    return this.http.post<VehicleTypeDTO>(this.baseUrl, vehicleType, this.httpOptions);
  }

  updateVehicleType(id: number, vehicleType: VehicleTypeDTO): Observable<VehicleTypeDTO> {
    return this.http.put<VehicleTypeDTO>(`${this.baseUrl}/${id}`, vehicleType, this.httpOptions);
  }

  deleteVehicleType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
