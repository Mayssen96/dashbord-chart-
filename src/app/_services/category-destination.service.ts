import { Injectable } from '@angular/core';
import { Categorie } from '../_models/categoryDestination';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryDestinationService {

  baseUrl="http://localhost:9090/categorie/"
  constructor(private http: HttpClient ) { }
  getCategories(){
    return this.http.get<Categorie[]>(this.baseUrl)
  }
  getCategoriyById(id:number){
    return this.http.get<Categorie>(this.baseUrl+id)
  }
}