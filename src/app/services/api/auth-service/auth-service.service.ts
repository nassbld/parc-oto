import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Votre URL d'authentification

  constructor(private http: HttpClient) {}

  // Méthode pour appeler l'endpoint de login
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Stocker le token reçu dans le localStorage
        if (response && response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  // Méthode pour stocker le token
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Méthode pour récupérer le token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
