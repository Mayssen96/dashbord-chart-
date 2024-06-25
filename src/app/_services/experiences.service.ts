import { Injectable } from '@angular/core';
import { Experience } from '../_models/experience';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {
baseUrl="http://localhost:9090/experience/"
  constructor(private http: HttpClient) { }
  getExperinces(){
    return this.http.get<Experience[]>(this.baseUrl)
  }
  getExperienceById(id:number){
    return this.http.get<Experience>(this.baseUrl+id)
  }

  deleteExperience(id:number){
    return this.http.delete(this.baseUrl+id)
  }
}
