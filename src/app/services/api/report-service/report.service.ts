import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportDTO } from '../../../dtos/dtos'; 

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:8080/reports';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getReportById(id: number): Observable<ReportDTO> {
    return this.http.get<ReportDTO>(`${this.baseUrl}/${id}`);
  }

  createReport(reservationId: number, report: ReportDTO): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${reservationId}`, report, this.httpOptions);
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
