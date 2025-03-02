import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ManageReservationDialogComponent} from '../manage-reservation-dialog/manage-reservation-dialog.component';
import {ReservationDTO, VehicleIdentityDTO} from '../../dtos/dtos';
import {VehicleService} from '../../services/api/vehicle-service/vehicle.service';

@Component({
  selector: 'app-incoming-reservation-card',
  standalone: true,
  imports: [],
  templateUrl: './incoming-reservation-card.component.html',
  styleUrl: './incoming-reservation-card.component.css'
})
export class IncomingReservationCardComponent implements OnInit {
  @Input() reservation!: ReservationDTO;
  vehicleIdentity: VehicleIdentityDTO | undefined;

  clickTime: string | undefined;

  startHour: string | undefined;
  endHour: string | undefined;

  constructor(private dialog: MatDialog,
              private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.getVehicleIdentityById(this.reservation.vehicleId);
    this.startHour = this.formatHour(this.reservation.start);
    this.endHour = this.formatHour(this.reservation.end);
  }

  getVehicleIdentityById(vehicleId: number): void {
    this.vehicleService.getVehicleIdentityById(vehicleId).subscribe(
      (vehicleIdentity: VehicleIdentityDTO) => {
        this.vehicleIdentity = vehicleIdentity;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'identité du véhicule:', error);
      }
    );
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    this.clickTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    dialogConfig.autoFocus = false;
    dialogConfig.maxWidth = '100vw'
    dialogConfig.width = '20rem';
    dialogConfig.data = this.clickTime;
    this.dialog.open(ManageReservationDialogComponent, dialogConfig);
    console.log(dialogConfig.data);
  }

  formatHour(date: Date): string {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }
}
