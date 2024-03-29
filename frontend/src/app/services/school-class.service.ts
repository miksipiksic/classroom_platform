import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { ScheduleClass } from '../models/scheduleClass';
import { SchoolClass } from '../models/schoolClass';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {


  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/classes";

  dodajCas(nastavnik: string,
    ucenik: string, predmet: string, pocetakCasa: string,
    krajCasa: string, tema: string, odradjen: boolean){
    const data = {
      nastavnik: nastavnik,
      ucenik: ucenik,
      predmet: predmet,
      pocetakCasa: pocetakCasa,
      krajCasa: krajCasa,
      tema: tema,
      odradjen: odradjen
    }

    return this.http.post<Message>('http://localhost:4000/classes/dodajCas', data);
  }

  odradiCas(nastavnik: string, pocetakCasa: string) {
    const data = {
      nastavnik: nastavnik,
      pocetakCasa: pocetakCasa
    }
    console.log(nastavnik)
    console.log(pocetakCasa)
    return this.http.post<Message>('http://localhost:4000/classes/odradiCas', {nastavnik: nastavnik, pocetakCasa: pocetakCasa});
  }

  dohvatiCasove() {
    return this.http.get<SchoolClass[]>('http://localhost:4000/classes/dohvatiCasove');
  }

  obrisiZahtev(nastavnik: string,
    ucenik: string, predmet: string, pocetakCasa: string,
    krajCasa: string, tema: string, odradjen: boolean){
    const data = {
      nastavnik: nastavnik,
      ucenik: ucenik,
      predmet: predmet,
      pocetakCasa: pocetakCasa,
      krajCasa: krajCasa,
      tema: tema,
      odradjen: odradjen
    }

    return this.http.post<Message>('http://localhost:4000/classes/obrisiZahtev', data);
  }


}
