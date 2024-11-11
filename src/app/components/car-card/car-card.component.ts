import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ManagementComponent} from '../../pages/management/management.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddEditCarDialogComponent} from '../add-edit-car-dialog/add-edit-car-dialog.component';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css'
})
export class CarCardComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.maxWidth = '100vw'
    dialogConfig.width = '50%';
    this.dialog.open(AddEditCarDialogComponent, dialogConfig);
  }
}
