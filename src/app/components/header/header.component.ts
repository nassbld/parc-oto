import {Component, CUSTOM_ELEMENTS_SCHEMA, HostListener} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from '../../services/api/auth-service/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
