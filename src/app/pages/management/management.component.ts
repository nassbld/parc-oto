import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarCardComponent} from "../../components/car-card/car-card.component";
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {AddEditCarDialogComponent} from '../../components/add-edit-car-dialog/add-edit-car-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {ReservationDTO, VehicleDTO, VehicleIdentityDTO} from '../../dtos/dtos';
import {VehicleService} from '../../services/api/vehicle-service/vehicle.service';
import {ReservationService} from '../../services/api/reservation-service/reservation.service';
import {CommonModule} from '@angular/common';
import {firstValueFrom, Subscription} from 'rxjs';
import {ManagementPageService} from '../../services/management-page/management-page.service';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    CommonModule,
    CarCardComponent,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit, OnDestroy {
  private updateSubscription: Subscription | undefined;
  vehicles: VehicleDTO[] = [];
  agencyId: number = 1;

  constructor(private dialog: MatDialog,
              private vehicleService: VehicleService,
              private managementPageService: ManagementPageService) {}

  async ngOnInit() {
    await this.getVehiclesByAgencyId(this.agencyId);

    this.updateSubscription = this.managementPageService.vehicleUpdate$.subscribe(async () => {
      await this.getVehiclesByAgencyId(this.agencyId);
    });
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  async getVehiclesByAgencyId(agencyId: number): Promise<void> {
    try {
      this.vehicles = await firstValueFrom(this.vehicleService.getVehiclesByAgencyId(agencyId));
    } catch (error) {
      console.error('Erreur lors de la récupération des véhicules:', error);
    }
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.maxWidth = '100vw'
    dialogConfig.width = '50%';

    dialogConfig.data = { vehicle: null };

    this.dialog.open(AddEditCarDialogComponent, dialogConfig);
  }
}
