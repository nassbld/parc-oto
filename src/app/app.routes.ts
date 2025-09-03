import { Routes } from '@angular/router';

// Importez les layouts et les pages
import { LoginComponent } from './pages/login/login.component';
import { SecureComponent } from './layouts/secure/secure.component'; // <-- Importez le layout sécurisé
import { HomeComponent } from './pages/home/home.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ManagementComponent } from './pages/management/management.component';

// Importez la garde
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 1. Route pour le layout public (juste la page de connexion)
  {
    path: 'login',
    component: LoginComponent
  },

  // 2. Route pour le layout sécurisé
  {
    path: '', // Correspond à la racine et à tout ce qui suit
    component: SecureComponent,
    canActivate: [authGuard], // On protège tout le layout
    children: [ // <-- Définition des routes enfants
      { path: 'home', component: HomeComponent },
      { path: 'reservations', component: ReservationsComponent },
      { path: 'management', component: ManagementComponent },

      // Redirection par défaut à l'intérieur du layout sécurisé
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  // 3. Route Wildcard finale pour rediriger vers la page par défaut
  { path: '**', redirectTo: '' }
];
