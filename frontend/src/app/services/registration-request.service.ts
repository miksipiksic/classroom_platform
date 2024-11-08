import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import User from '../models/user';
import { Message } from '../models/message';
import RegRequest from '../models/regrequest';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/requests";


  registerNastavnik(user: User) {
    return this.http.post<Message>("http://localhost:4000/requests/registerNastavnik", user);
  } 

  dohvatiZahteve() {
    return this.http.get<RegRequest[]>("http://localhost:4000/requests/dohvatiZahteve");
  }

  postojeciKorisnikIme(korisnickoIme: string) {
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<RegRequest>('http://localhost:4000/requests/postojeciKorisnikIme', data);
  }

  postojeciKorisnikImejl(imejl: string) {
    const data = {
      imejl: imejl
    }
    return this.http.post<RegRequest>('http://localhost:4000/requests/postojeciKorisnikImejl', data);
  }
  obrisiZahtev(korisnickoIme: string) {
    return this.http.post<Message>('http://localhost:4000/requests/obrisiZahtev', {korisnickoIme: korisnickoIme});
  }

  dodajPredmet(korisnickoIme: string, imePredmeta: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      imePredmeta: imePredmeta
    }
    return this.http.post<Message>('http://localhost:4000/requests/dodajPredmet', data)
  }


}
