import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule, MatDialogRef
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {VehicleDTO, VehicleTypeDTO} from '../../dtos/dtos';
import {VehicleTypeService} from '../../services/api/vehicle-type-service/vehicle-type.service';
import {firstValueFrom} from 'rxjs';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {VehicleService} from '../../services/api/vehicle-service/vehicle.service';
import {VehicleStatus} from '../../enums/enums';
import {ManagementPageService} from '../../services/management-page/management-page.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-car-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInput,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './add-edit-car-dialog.component.html',
  styleUrl: './add-edit-car-dialog.component.css'
})

export class AddEditCarDialogComponent implements OnInit {
  isEditMode: boolean = false;
  vehicleForm!: FormGroup;
  vehicle: VehicleDTO;
  vehicleTypes: VehicleTypeDTO[] = [];
  vehicleModelsByBrand: VehicleTypeDTO[] = [];
  uniqueBrands: Set<string> = new Set();
  selectedBrand: string | undefined;

  agencyId: number = 1;

  statusOptions: { value: VehicleStatus; display: string }[] = [
    { value: VehicleStatus.AVAILABLE, display: 'Disponible' },
    { value: VehicleStatus.UNDER_MAINTENANCE, display: 'En maintenance' },
    { value: VehicleStatus.INSURANCE_EXPIRED, display: 'Assurance expirée' },
    { value: VehicleStatus.TECHNICAL_CONTROL_EXPIRED, display: 'Contrôle technique expiré' }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { vehicle: VehicleDTO | null },
              private dialogRef: MatDialogRef<AddEditCarDialogComponent>,
              private managementPageService: ManagementPageService,
              private formBuilder: FormBuilder,
              private vehicleService: VehicleService,
              private vehicleTypeService: VehicleTypeService,
              private cdr: ChangeDetectorRef) {
    this.isEditMode = !!data.vehicle;
    this.vehicle = data.vehicle || {} as VehicleDTO;
  }

  async ngOnInit() {
    this.initForm();
    await this.getVehicleTypes();
    if (this.isEditMode) {
      await this.loadVehicleTypeDetails();
    }
  }

  initForm() {
    this.vehicleForm = this.formBuilder.group({
      agencyId: [this.agencyId, Validators.required],
      vehicleTypeId: [{value: '', disabled: true}, Validators.required],
      licensePlate: ['', Validators.required],
      endInsurance: ['', Validators.required],
      endTechnicalControl: ['', Validators.required],
      status: ['', Validators.required]
    });

    if (this.isEditMode) {
      this.vehicleForm.patchValue({
        agencyId: this.agencyId,
        vehicleTypeId: this.vehicle.vehicleTypeId,
        licensePlate: this.vehicle.licensePlate,
        endInsurance: this.vehicle.endInsurance,
        endTechnicalControl: this.vehicle.endTechnicalControl,
        status: this.vehicle.status
      });
    }
  }


  onSubmit() {
    if (this.vehicleForm.valid) {
      const vehicleData: VehicleDTO = {
        ...this.vehicleForm.value,
        endInsurance: new Date(this.vehicleForm.value.endInsurance),
        endTechnicalControl: new Date(this.vehicleForm.value.endTechnicalControl)
      };

      if (this.isEditMode) {
        // Update
        this.vehicleService.updateVehicle(this.vehicle.id, vehicleData).subscribe(
          response => {
            console.log('Véhicule mis à jour', response);
            this.managementPageService.triggerUpdate();
            this.dialogRef.close(response);
          },
          error => {
            console.error('Erreur mise à jour', error);
          }
        );
      } else {
        // Create
        this.vehicleService.createVehicle(vehicleData).subscribe(
          response => {
            console.log('Véhicule créé', response);
            this.managementPageService.triggerUpdate();
            this.dialogRef.close(response);
          },
          error => {
            console.error('Erreur création', error);
          }
        );
      }
    }
  }

  private updateVehicleTypeIdState() {
    const vehicleTypeIdControl = this.vehicleForm.get('vehicleTypeId');
    if (this.vehicleModelsByBrand.length > 0) {
      vehicleTypeIdControl?.enable();
    } else {
      vehicleTypeIdControl?.disable();
    }
  }

  async onBrandSelected(brand: string) {
    await this.getVehicleTypesByBrand(brand);

    const currentVehicleTypeId = this.vehicleForm.get('vehicleTypeId')?.value;
    const isValidModel = this.vehicleModelsByBrand.some(model => model.id === currentVehicleTypeId);

    if (!isValidModel) {
      this.vehicleForm.get('vehicleTypeId')?.reset();
    }

    this.updateVehicleTypeIdState();
  }

  // Vehicle type (brand & model)

  async getVehicleTypes(): Promise<void> {
    try {
      this.vehicleTypes = await firstValueFrom(this.vehicleTypeService.getAllVehicleTypes());
      this.uniqueBrands = new Set(this.vehicleTypes.map(type => type.brand));
    } catch (error) {
      console.error('Erreur lors de la récupération des modèles de véhicules:', error);
      this.vehicleTypes = [];
      this.uniqueBrands = new Set();
    }
  }

  async getVehicleTypesByBrand(brand: string): Promise<void> {
    try {
      this.vehicleModelsByBrand = await firstValueFrom(this.vehicleTypeService.getVehicleTypesByBrand(brand));
      this.updateVehicleTypeIdState();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erreur lors de la récupération des modèles de la marque ' + brand, error);
      this.vehicleModelsByBrand = [];
    }
  }

  currentVehicleType: VehicleTypeDTO | undefined;

  private async loadVehicleTypeDetails() {
    try {
      this.currentVehicleType = await firstValueFrom(
        this.vehicleTypeService.getVehicleTypeById(this.vehicle.vehicleTypeId)
      );
      this.selectedBrand = this.currentVehicleType.brand;
      await this.getVehicleTypesByBrand(this.currentVehicleType.brand);
      this.vehicleForm.patchValue({
        vehicleTypeId: this.currentVehicleType.id
      });
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erreur lors du chargement du type de véhicule', error);
    }
  }

}
