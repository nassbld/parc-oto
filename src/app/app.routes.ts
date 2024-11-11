import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ReservationsComponent} from './pages/reservations/reservations.component';
import {ManagementComponent} from './pages/management/management.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'management', component: ManagementComponent }
];

