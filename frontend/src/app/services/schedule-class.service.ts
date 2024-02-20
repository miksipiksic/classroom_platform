import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScheduleClass } from '../models/scheduleClass';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ScheduleClassService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/classrequests";

  dodajZahtev(nastavnik: string,
    ucenik: string, predmet: string, pocetakCasa: string,
    krajCasa: string, tema: string){
    const data = {
      nastavnik: nastavnik,
      ucenik: ucenik,
      predmet: predmet,
      pocetakCasa: pocetakCasa,
      krajCasa: krajCasa,
      tema: tema
    }

    return this.http.post<Message>('http://localhost:4000/classrequests/dodajZahtev', data);
  }

  dohvatiZahteve() {
    return this.http.get<ScheduleClass[]>('http://localhost:4000/classrequests/dohvatiZahteve');
  }

  obrisiZahtev(nastavnik: string, pocetakCasa: string){
    const data = {
      nastavnik: nastavnik,
      pocetakCasa: pocetakCasa,
    }

    return this.http.post<Message>('http://localhost:4000/classrequests/obrisiZahtev', data);
  }

  odbijZahtev(nastavnik: string, pocetakCasa: string, obrazlozenje: string){
    const data = {
      nastavnik: nastavnik,
      pocetakCasa: pocetakCasa,
      obrazlozenje: obrazlozenje
    }

    return this.http.post<Message>('http://localhost:4000/classrequests/odbijZahtev',
    data);
  }
  prihvatiZahtev(nastavnik: string, pocetakCasa: string){
    const data = {
      nastavnik: nastavnik,
      pocetakCasa: pocetakCasa,

    }

    return this.http.post<Message>('http://localhost:4000/classrequests/prihvatiZahtev',
    data);
  }


}
