import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RegistrationRequestService } from '../services/registration-request.service';
import User from '../models/user';
import RegRequest from '../models/regrequest';
import { EngagementService } from '../services/engagement.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private router: Router, private userService: UserService, private requestService: RegistrationRequestService, private engagementService: EngagementService) { }
  loggedIn: string = "";
  message: string = "";

  username: string = "";

  ngOnInit(): void {
    this.userService.dohvatiUcenike().subscribe(
      data => {
        this.ucenici = data;
        this.tipSkoleConvert(this.ucenici);
      }
    )

    this.userService.dohvatiNastavnike().subscribe(
      data => {
        this.nastavnici = data;
      }
    )

    this.requestService.dohvatiZahteve().subscribe(
      data => {
        this.zahtevi = data;
      }
    )
  //  this.loggedIn = sessionStorage.getItem("loggedIn");

    if(this.loggedIn != "admin") {
    //  this.router.navigate(['']);
     // return;
    }

   // this.userService.updateNavbar("admin");
 //   this.username = sessionStorage.getItem("username");
  }

  nastavnici!: User[];

  ucenici!: User[];
  zahtevi!: RegRequest[];

  tipSkoleConvert(lista: User[]) {
    for (let ucenik of lista) {
      if (ucenik.tipSkole == "osnovna") {
        ucenik.tipSkole = "основна";
      }
      if (ucenik.tipSkole == "srednja-gimnazija") {
        ucenik.tipSkole = "средња-гимназија";
      }
      if (ucenik.tipSkole =="srednja-strucna") {
        ucenik.tipSkole = "средња-стручна";
      }
      if (ucenik.tipSkole == "srednja-umetnicka") {
        ucenik.tipSkole = "средња-уметничка";
      }
    }
  }

  nastavnikZahtev: RegRequest = new RegRequest();

  odbijZahtev(korisnickoIme: string) {

   // this.requestService.dohvatiZahteve(korisnickoIme).subscribe(
   //   data => {
    //    this.nastavnikZahtev = data;

    //  }
   // )

    this.requestService.postojeciKorisnikIme(korisnickoIme).subscribe(
      data => {
        this.nastavnikZahtev = data;
        this.odbijanje(this.nastavnikZahtev);
      }
    )

  }

  odbijanje(zahtev: RegRequest) {
    zahtev.prihvacen = 2; // odbijen
    this.userService.registerNastavnik(zahtev).subscribe(
      data => {
        if (data.message == "ok") {
          alert("Obijen zahtev");
          this.requestService.obrisiZahtev(zahtev.korisnickoIme).subscribe(
            ok => {
              if (ok.message == "ok") {
                alert("Obrisan zahtev.")
              }
            }
          )
        }
      }
    )

    
  }



  odobriZahtev(korisnickoIme: string) {
    
    this.requestService.postojeciKorisnikIme(korisnickoIme).subscribe(
      data => {
        this.nastavnikZahtev = data;
        this.odobravanje(this.nastavnikZahtev);
      }
    )

  }

  odobravanje(zahtev: RegRequest) {
    zahtev.prihvacen = 1; // prihvacen
    this.userService.registerNastavnik(zahtev).subscribe(
      data => {
        if (data.message == "ok") {
          alert("Prihvacen zahtev");
          this.requestService.obrisiZahtev(zahtev.korisnickoIme).subscribe(
            ok => {
              if (ok.message == "ok") {
                alert("Obrisan zahtev.")
              }
            }
          )
        }
      }
    )

    for (let predmet of zahtev.predmet) {
      this.engagementService.dodajAngazovanje(zahtev.korisnickoIme, predmet).subscribe(
        ok => {
          alert("Dodato angazovanje.");
        }
      )
    }
    
    
  }


}
