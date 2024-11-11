import {Component, inject} from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

interface CarBrand {
  value: string;
  viewValue: string;
}

interface CarModel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-car-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInput,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './add-edit-car-dialog.component.html',
  styleUrl: './add-edit-car-dialog.component.css'
})

export class AddEditCarDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddEditCarDialogComponent>);

  carBrands: CarBrand[] = [
    {value: 'renault-0', viewValue: 'Renault'},
    {value: 'peugeot-1', viewValue: 'Peugeot'},
    {value: 'citroen-2', viewValue: 'Citroen'},
  ];

  carModels: CarModel[] = [
    {value: 'kangoo-0', viewValue: 'Kangoo'},
    {value: 'express-1', viewValue: 'Express'},
    {value: 'partner-2', viewValue: 'Partner'},
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPhotoUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log('Photo sélectionnée :', file.name);
      // Vous pouvez traiter l'image ici
    }
  }

}
