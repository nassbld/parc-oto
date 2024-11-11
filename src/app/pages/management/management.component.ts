import {Component} from '@angular/core';
import {CarCardComponent} from "../../components/car-card/car-card.component";
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {AddEditCarDialogComponent} from '../../components/add-edit-car-dialog/add-edit-car-dialog.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    CarCardComponent,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.maxWidth = '100vw'
    dialogConfig.width = '50%';
    this.dialog.open(AddEditCarDialogComponent, dialogConfig);
  }
}
