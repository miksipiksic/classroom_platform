import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { SubjectRequest } from '../models/subjectrequest';

@Injectable({
  providedIn: 'root'
})
export class SubjectRequestService {
  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/subjectrequests";

  dodajZahtev(imePredmeta: string, korisnickoIme: string){
    const data = {
      imePredmeta: imePredmeta,
      korisnickoIme: korisnickoIme
    }
  
    return this.http.post<Message>('http://localhost:4000/subjectrequests/dodajZahtev', data);
  }

  dohvatiZahteve() {
    return this.http.get<SubjectRequest[]>('http://localhost:4000/subjectrequests/dohvatiZahteve');
  }

  obrisiZahtev(korisnickoIme: string, imePredmeta: string) {
    const data = {
      imePredmeta: imePredmeta,
      korisnickoIme: korisnickoIme

    }
    return this.http.post<Message>('http://localhost:4000/subjectrequests/obrisiZahtev', data);
  }
}
