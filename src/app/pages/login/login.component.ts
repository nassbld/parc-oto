import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/api/auth-service/auth-service.service';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: 'login.component.css',
  imports: [
    NgIf,
    FormsModule
  ],
  standalone: true
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // Le token est stocké par le service, on redirige l'utilisateur
        this.router.navigate(['/dashboard']); // Redirigez vers votre page principale après connexion
      },
      error: (err) => {
        this.errorMessage = 'Email ou mot de passe incorrect.';
        console.error('Erreur de connexion', err);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
