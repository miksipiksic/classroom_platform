import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/user';
import { SchoolSubject } from '../models/schoolsubject';
import { Message } from '../models/message';
import { Engagement } from '../models/engagement';

@Injectable({
  providedIn: 'root'
})
export class EngagementService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000/engagements";

  dodajAngazovanje(nastavnik: string, predmet: string){
    const data = {
      nastavnik: nastavnik,
      predmet: predmet
    }
  
    return this.http.post<Message>('http://localhost:4000/engagements/dodajAngazovanje', data);
  }

  dohvatiAngazovanja() {
    return this.http.get<Engagement[]>('http://localhost:4000/engagements/dohvatiAngazovanja');
  }

  dodajAngazovanjeNastavnika(predmet: string, nastavnik: string) {
    const data = {
      predmet: predmet,
      nastavnik: nastavnik
    }

    return this.http.post<Message>('http://localhost:4000/engagements/dodajAngazovanjeNastavnika', data)

  }

  dodajPredmet(predmet: string) {
    const data = {
      predmet: predmet
    }
    return this.http.post<Message>('http://localhost:4000/engagements/dodajPredmet', data); 
  }


}
