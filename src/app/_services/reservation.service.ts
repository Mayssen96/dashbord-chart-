import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../_models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/reservation';

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/show`);
  }

  getTotalReservationCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/add`, reservation);
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/update/${reservation.id}`, reservation);
  }

  removeReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${id}`);
  }
}
