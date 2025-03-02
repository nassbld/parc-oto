import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {VehicleService} from '../../services/api/vehicle-service/vehicle.service';
import {ManagementPageService} from '../../services/management-page/management-page.service';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatDialogClose
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  vehicleId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { vehicleID: number },
              private dialogRef: MatDialogRef<DeleteDialogComponent>,
              private vehicleService: VehicleService,
              private managementPageService: ManagementPageService) {
    this.vehicleId = data.vehicleID;
  }

  onDelete(): void {
    this.vehicleService.safeDeleteVehicle(this.vehicleId).subscribe(
      response => {
        this.managementPageService.triggerUpdate();
        this.dialogRef.close(response);
        console.log("Safe deleted with success");
      },
      error => {
        console.error("Error safe deleting vehicle", error);
      }
    );
  }
}
