import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Grade } from '../models/grade';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/grades";

  dodajOcenu(nastavnik: string, 
    ucenik: string, predmet: string, ocena: number,
    komentar: string){
    const data = {
      nastavnik: nastavnik,
      ucenik: ucenik,
      predmet: predmet,
      ocena: ocena,
      komentar: komentar
    }
  
    return this.http.post<Message>('http://localhost:4000/grades/dodajOcenu', data);
  }

  dohvatiOcene(ucenik: string) {
    const data = {
      ucenik: ucenik
    }
    return this.http.post<Grade[]>('http://localhost:4000/grades/dohvatiOcene', data);
  }
  
}
