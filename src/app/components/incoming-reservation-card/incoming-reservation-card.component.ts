import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ManageReservationDialogComponent} from '../manage-reservation-dialog/manage-reservation-dialog.component';

@Component({
  selector: 'app-incoming-reservation-card',
  standalone: true,
  imports: [],
  templateUrl: './incoming-reservation-card.component.html',
  styleUrl: './incoming-reservation-card.component.css'
})
export class IncomingReservationCardComponent {
  clickTime: string | undefined;

  constructor(private dialog: MatDialog) {}

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
}
