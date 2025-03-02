import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagementPageService {

  constructor() { }

  private vehicleUpdateSubject = new Subject<void>();

  vehicleUpdate$ = this.vehicleUpdateSubject.asObservable();

  triggerUpdate() {
    this.vehicleUpdateSubject.next();
  }
}
