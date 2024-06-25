import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private backendUrl = 'http://localhost:8080'; // L'URL de votre backend
  capteurs: string[] = [];
  consignes: number[] = [];
  constructor(private http: HttpClient) {}


  getLatestData(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/api/data`)
  }

  logCapteurs() {
    console.log("Capteurs:", this.capteurs);
  }
}




