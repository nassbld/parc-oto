import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from '../services/api/auth-service/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifie si un token existe
  if (authService.getToken()) {
    // L'utilisateur est authentifié, on autorise l'accès à la route
    return true;
  }

  // L'utilisateur n'est pas authentifié, on le redirige vers la page de connexion
  router.navigate(['/login']);
  return false;
};
