import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../_models/formation';
import { Reservation } from '../_models/reservation';  

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8080/formation';
  private reservationApiUrl = 'http://localhost:8080/reservation';

  constructor(private http: HttpClient) {}

  getAllFormations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/show`);
  }

  addFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiUrl}/add`, formation);
  }

  updateFormation(formation: Formation): Observable<Formation> {
    return this.http.put<Formation>(`${this.apiUrl}/update/${formation.id}`, formation);
  }

  removeFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${id}`);
  }
  
  
  reserve(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.reservationApiUrl}/add`, reservation);  
  }
}

