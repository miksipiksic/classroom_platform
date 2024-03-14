import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RegistrationRequestService } from '../services/registration-request.service';
import User from '../models/user';
import RegRequest from '../models/regrequest';
import { EngagementService } from '../services/engagement.service';
import { SubjectRequest } from '../models/subjectrequest';
import { SubjectRequestService } from '../services/subject-request.service';
import { SchoolsubjectService } from '../services/schoolsubject.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private router: Router, private userService: UserService, private requestService: RegistrationRequestService,
     private engagementService: EngagementService, private subjectRequestService: SubjectRequestService, private schoolSubjectService: SchoolsubjectService) { }
  loggedIn: string = "";
  message: string = "";

  username: string = "";

  messagePredmet: string = ""

  bar: boolean = false;
  pie: boolean = false;
  histo: boolean = false;
  line: boolean= false;
  prikaziBar() {
    this.bar = true;
    this.pie = false;
    this.histo = false;
    this.line = false;
  }

  prikaziPie() {
    this.pie = true;
    this.bar = false;
    this.histo = false;
    this.line = false;
  }

  prikaziLine() {
    this.line = true;
    this.bar = false;
    this.pie = false;
    this.histo =false;
  }

  prikaziHisto() {
    this.line = false;
    this.histo = true;
    this.pie = false;
    this.bar = false;
  }

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
        this.nastavnici = this.nastavnici.filter((value)=> (value.prihvacen !== 2));
      }
    )

    this.requestService.dohvatiZahteve().subscribe(
      data => {
        this.zahtevi = data;
      }
    )

    this.subjectRequestService.dohvatiZahteve().subscribe(
      data => {
        this.zahteviPredmeti = data;
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

  nastavnici: User[] = [];

  ucenici: User[] = [];
  zahtevi: RegRequest[] = [];

  zahteviPredmeti:SubjectRequest[] = [];

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

  odobriZahtevPredmet(korisnickoIme: string, imePredmeta: string) {
    this.schoolSubjectService.dodajPredmet(imePredmeta).subscribe(
      ok => {
        this.userService.postojeciKorisnikIme(korisnickoIme).subscribe(
          data => {
            if (data.korisnickoIme == korisnickoIme) {
              // odobren
              this.userService.dodajPredmet(korisnickoIme, imePredmeta).subscribe(
                ok => {
                  this.engagementService.dodajPredmet(imePredmeta).subscribe(
                    ok => {
                      this.engagementService.dodajAngazovanjeNastavnika(imePredmeta, korisnickoIme).subscribe(
                        ok => {

                        }
                      )
                    }
                  )
                  this.subjectRequestService.obrisiZahtev(korisnickoIme, imePredmeta).subscribe(
                    ok => {

                    }
                  )
                }
              )
            }
          }
        )

        this.requestService.postojeciKorisnikIme(korisnickoIme).subscribe(
          data => {
            if (data.korisnickoIme == korisnickoIme) {
                this.requestService.dodajPredmet(korisnickoIme, imePredmeta).subscribe(
                  ok => {
                    this.engagementService.dodajPredmet(imePredmeta).subscribe(
                      ok => {

                      }
                    )
                    this.subjectRequestService.obrisiZahtev(korisnickoIme, imePredmeta).subscribe(
                      ok => {

                      }
                    )
                  }
                )

            }
          }
        )
      }
    )

    this.zahteviPredmeti = this.zahteviPredmeti.filter((value) => ((value.korisnickoIme !== korisnickoIme) && (value.imePredmeta !== imePredmeta)));




  }

  odbijZahtevPredmet(korisnickoIme: string, imePredmeta: string) {
    this.subjectRequestService.obrisiZahtev(korisnickoIme, imePredmeta).subscribe(
      ok => {

      }
    )
    this.zahteviPredmeti = this.zahteviPredmeti.filter((value) => ((value.korisnickoIme !== korisnickoIme) && (value.imePredmeta !== imePredmeta)));
  }

  odbijZahtev(korisnickoIme: string) {

  
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
    this.zahtevi = this.zahtevi.filter((value) => value.korisnickoIme !== zahtev.korisnickoIme);

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
          for (let predmet of zahtev.predmet) {
            this.engagementService.dodajAngazovanjeNastavnika( predmet,zahtev.korisnickoIme).subscribe(
              ok => {
              }
            )
          }

          this.requestService.obrisiZahtev(zahtev.korisnickoIme).subscribe(
            ok => {
              if (ok.message == "ok") {
              }
            }
          )


    this.zahtevi = this.zahtevi.filter((value) => value.korisnickoIme !== zahtev.korisnickoIme);

        }
      }
    )


  }

  adminPredmet: string = "";

  dodajAdminPredmet() {
    this.schoolSubjectService.dodajPredmet(this.adminPredmet).subscribe(
      ok => {
        this.engagementService.dodajPredmet(this.adminPredmet).subscribe(
          ok => {
            this.messagePredmet = "Успешно додат предмет."
          }
        )
      }
    )
  }


}
