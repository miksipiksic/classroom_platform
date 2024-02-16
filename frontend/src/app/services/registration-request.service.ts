import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import User from '../models/user';
import { Message } from '../models/message';
import Request from '../models/request';

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
    return this.http.get<Request>("http://localhost:4000/requests/dohvatiZahteve");
  }

  postojeciKorisnikIme(korisnickoIme: string) {
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Request>('http://localhost:4000/requests/postojeciKorisnikIme', data);
  }

  postojeciKorisnikImejl(imejl: string) {
    const data = {
      imejl: imejl
    }
    return this.http.post<Request>('http://localhost:4000/requests/postojeciKorisnikImejl', data);
  }

}
