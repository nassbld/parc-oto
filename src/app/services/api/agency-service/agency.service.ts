import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgencyDTO } from '../../../dtos/dtos';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  private baseUrl = 'http://localhost:8080/agencies';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Récupérer une agence par son ID
  getAgencyById(id: number): Observable<AgencyDTO> {
    return this.http.get<AgencyDTO>(`${this.baseUrl}/${id}`);
  }

  // Créer une nouvelle agence
  createAgency(agency: AgencyDTO): Observable<void> {
    return this.http.post<void>(this.baseUrl, agency, this.httpOptions);
  }

  // Mettre à jour une agence
  updateAgency(id: number, agency: AgencyDTO): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, agency, this.httpOptions);
  }

  // Supprimer une agence
  deleteAgency(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions);
  }
}
