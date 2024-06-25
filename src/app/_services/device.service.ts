import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Device } from '../_models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'http://localhost:8080/api/devices';

  constructor(private http: HttpClient, private router: Router) {}

  addDevice(device: Device): Observable<Device> {
      return this.http.post<Device>(`${this.apiUrl}`, device);
  }

  updateDevice(device: Device): Observable<Device> {
      return this.http.put<Device>(`${this.apiUrl}/${device.id}`, device);
  }


  getAllDevices(): Observable<any> {
      return this.http.get(this.apiUrl);
  }



  removeDevice(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
