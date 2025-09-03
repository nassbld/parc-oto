import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {AuthService} from '../services/api/auth-service/auth-service.service';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Injectez le service d'authentification
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  if (authToken) {
    // Clone la requête pour y ajouter le nouvel en-tête
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq);

  }

  return next(req);
};
