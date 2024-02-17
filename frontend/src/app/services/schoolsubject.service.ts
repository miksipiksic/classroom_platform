import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { SchoolSubject } from '../models/schoolsubject';

@Injectable({
  providedIn: 'root'
})
export class SchoolsubjectService {

  
  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/schoolsubjects";

  dodajPredmet(imePredmeta: string){
  
    return this.http.post<Message>('http://localhost:4000/schoolsubjects/dodajPredmet', {imePredmeta: imePredmeta});
  }

  dohvatiPredmete() {
    return this.http.get<SchoolSubject[]>('http://localhost:4000/schoolsubjects/dohvatiPredmete');
  }
}
