import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ManagementComponent} from '../../pages/management/management.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddEditCarDialogComponent} from '../add-edit-car-dialog/add-edit-car-dialog.component';
import {VehicleDTO, VehicleIdentityDTO, VehicleTypeDTO} from '../../dtos/dtos';
import {VehicleTypeService} from '../../services/api/vehicle-type-service/vehicle-type.service';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css'
})
export class CarCardComponent implements OnInit {
  @Input() vehicle!: VehicleDTO;
  vehicleType: VehicleTypeDTO | undefined;

  formattedEndInsurance: string | undefined;
  formattedEndTechnicalControl: string | undefined;

  constructor(private dialog: MatDialog,
              private vehicleTypeService: VehicleTypeService) {}

  ngOnInit(): void {
    this.getVehicleType(this.vehicle.vehicleTypeId);
    this.formattedEndInsurance = this.formatDate(this.vehicle.endInsurance);
    this.formattedEndTechnicalControl = this.formatDate(this.vehicle.endTechnicalControl);
  }

  getVehicleType(vehicleTypeId: number): void {
    this.vehicleTypeService.getVehicleTypeById(vehicleTypeId).subscribe(
      (vehicleType: VehicleTypeDTO) => {
        this.vehicleType = vehicleType;
      },
      (error) => {
        console.error('Erreur lors de la récupération du type de véhicule:', error);
      }
    )
  }

  formatDate(date: Date | string): string {
    const dateObject = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    let formattedDate = dateObject.toLocaleDateString('fr-FR', options);

    formattedDate = formattedDate.replace(/^\d+ (\w)/, (match, p1) => match.replace(p1, p1.toUpperCase()));

    return formattedDate;
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.maxWidth = '100vw'
    dialogConfig.width = '50%';
    dialogConfig.data = { vehicle: this.vehicle };

    this.dialog.open(AddEditCarDialogComponent, dialogConfig);
  }

  openDeleteDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.data = { vehicleID: this.vehicle.id };

    this.dialog.open(DeleteDialogComponent, dialogConfig);
  }
}
