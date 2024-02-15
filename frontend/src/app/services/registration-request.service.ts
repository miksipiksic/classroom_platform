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

  uri = "http://localhost:4000/request";


  registerNastavnik(user: User) {
    return this.http.post<Message>("${this.uri}/registerNastavnik", user);
  } 

  dohvatiZahteve() {
    return this.http.get<Request>("${this.uri}/dohvatiZahteve");
  }

}
