import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import User from '../models/user';
import RegRequest from '../models/regrequest';
import { Message } from '../models/message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/user";

  registerUcenik(user:User)  {
      return this.http.post<Message>('http://localhost:4000/user/registerUcenik', user);
    }

  postojeciKorisnikIme(korisnickoIme: string) {
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<User>('http://localhost:4000/user/postojeciKorisnikIme', data);
  }

  postojeciKorisnikImejl(imejl: string) {
    const data = {
      imejl: imejl
    }
    return this.http.post<User>('http://localhost:4000/user/postojeciKorisnikImejl', data);
  }

  nadjiLozinku(korisnickoIme: string) {
    return this.http.post<string>('http://localhost:4000/user/nadjiLozinku', korisnickoIme);
  }

  promeniLozinku(korisnickoIme: string, lozinka: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka
    }
    return this.http.post<Message>('http://localhost:4000/user/promeniLozinku', data);
  }

  dohvatiKorisnika(korisnickoIme: string) {
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<User>('http://localhost:4000/user/dohvatiKorisnika', data);
  }

  private loggedInSource = new BehaviorSubject('false');
  currentLoggedIn = this.loggedInSource.asObservable();
  updateNavbar(message: string) {
    this.loggedInSource.next(message)
  }

  dohvatiUcenike() {
    return this.http.get<User[]>('http://localhost:4000/user/dohvatiUcenike');
  }
  dohvatiNastavnike() {
    return this.http.get<User[]>('http://localhost:4000/user/dohvatiNastavnike');
  }

  registerNastavnik(data: RegRequest) {

    return this.http.post<Message>('http://localhost:4000/user/registerNastavnik', data);
  }

  dodajPredmet(korisnickoIme: string, imePredmeta: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      imePredmeta: imePredmeta
    }
    return this.http.post<Message>('http://localhost:4000/user/dodajPredmet', data)
  }

  promeniIme(korisnickoIme: string, ime: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      ime: ime
    }
    return this.http.post<Message>('http://localhost:4000/user/promeniIme', data)
  }
  
  
  promeniPrezime(korisnickoIme: string, prezime: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      prezime: prezime
    }
    return this.http.post<Message>('http://localhost:4000/user/promeniPrezime', data)
  }

  
  promeniImejl(korisnickoIme: string, imejl: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      imejl: imejl
    }
    return this.http.post<Message>('http://localhost:4000/user/promeniImejl', data)
  }

  
  promeniAdresu(korisnickoIme: string, adresa: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      adresa: adresa
    }
    return this.http.post<Message>('http://localhost:4000/user/promeniAdresu', data)
  }

  
  promeniKontaktTelefon(korisnickoIme: string, kontaktTelefon: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      kontaktTelefon: kontaktTelefon
    }
    return this.http.post<Message>('http://localhost:4000/user/promeniKontaktTelefon', data)
  }

  
  promeniTipSkole(korisnickoIme: string, tipSkole: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      tipSkole: tipSkole
    }
    return this.http.post<Message>('http://localhost:4000/user/promeniTipSkole', data)
  }

  
  promeniRazred(korisnickoIme: string, razred: number) {
    const data = {
      korisnickoIme: korisnickoIme,
      razred: razred
    }
    return this.http.post<Message>('http://localhost:4000/user/promeniRazred', data)
  }

  promeniProfilnuSliku(korisnickoIme: string, profilnaSlika: string) {
    const data = {
      korisnickoIme: korisnickoIme,
      profilnaSlika: profilnaSlika
    }
    return this.http.post<Message>('http://localhost:4000/user/promeniProfilnuSliku', data)
  }

  

}
