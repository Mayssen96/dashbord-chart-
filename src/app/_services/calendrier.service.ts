import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendrier } from '../_models/calendrier';

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {
    private apiUrl = 'http://localhost:8080/calendrier/';


    constructor(private http: HttpClient) {}

    addCalendrier(avis: Calendrier): Observable<Calendrier> {
        return this.http.post<Calendrier>(`${this.apiUrl}add`, avis); // badalt user b User
    }


    updateCalendrier(avis: Calendrier): Observable<Calendrier> {
        //console.log('password in service ' + user.password);
        return this.http.put<Calendrier>(`${this.apiUrl}${avis.id}`, avis);
    }


    getAllCalendriers(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    removeCalendrier(avis: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${avis}`);
    }

    getCalendrierById(avis:any):Observable<Calendrier>{
        return this.http.get<Calendrier>(`${this.apiUrl}${avis}`)
    }

}
