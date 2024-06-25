import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../_models/company';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:8080/api/companies';

  constructor(private http: HttpClient, private router: Router) {}

  addCompany(company: Company): Observable<Company> {
      return this.http.post<Company>(`${this.apiUrl}`, company);
  }

  updateCompany(company: Company): Observable<Company> {
      return this.http.put<Company>(`${this.apiUrl}/${company.id}`, company);
  }

  // profile (){
  //   //window.localStorage.clear();
  //   //this.updateLoggedInState(false);
  //   this.router.navigateByUrl('/profile');

  // }
  getAllcompanies(): Observable<any> {
      return this.http.get(this.apiUrl);
  }

  getNameCompany(id : number):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  removeCompany(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // blockUser(userId: number): Observable<User> {
  //     return this.http.put<User>(`${this.apiUrl}${userId}/block`, null);
  // }

  // unblockUser(userId: number): Observable<User> {
  //     return this.http.put<User>(`${this.apiUrl}${userId}/unblock`, null);
  // }
}
