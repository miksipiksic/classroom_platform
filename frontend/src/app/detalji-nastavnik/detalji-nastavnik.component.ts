import { Component } from '@angular/core';
import User from '../models/user';
import { UserService } from '../services/user.service';

import { Time } from '@angular/common';
import { ScheduleClassService } from '../services/schedule-class.service';
import { ScheduleClass } from '../models/scheduleClass';
import { SchoolClassService } from '../services/school-class.service';
import { SchoolClass } from '../models/schoolClass';


@Component({
  selector: 'app-detalji-nastavnik',
  templateUrl: './detalji-nastavnik.component.html',
  styleUrls: ['./detalji-nastavnik.component.css']
})
export class DetaljiNastavnikComponent {

  constructor(private userService: UserService, private scheduleClassService: ScheduleClassService, private classService: SchoolClassService) { }

  ngOnInit() {

    let loggedIn = localStorage.getItem("loggedIn");
    //this.userService.updateNavbar(this.loggedIn);
    let nastavnik = localStorage.getItem("detaljiNastavnik");
    console.log(loggedIn)
    if (nastavnik) {
      this.userService.dohvatiKorisnika(nastavnik).subscribe(
        u => {
          this.nastavnik = u;
          this.classService.dohvatiCasove().subscribe(
            rq => {
              this.casovi = rq;
              this.casovi = this.casovi.filter((value) => (value.nastavnik) === this.nastavnik.korisnickoIme);
            }
          )
          for (let p of this.nastavnik.predmet) {
            this.listaPredmeta.push(p);
          }

          if (this.listaPredmeta.length === 1) {
            this.jediniPredmet = <string>this.listaPredmeta.at(0);
            this.jedanPredmet = true;
          }

        }
      )
    }
    if (loggedIn) {
      this.userService.dohvatiKorisnika(loggedIn).subscribe(user => {
        this.user = user;
      })
    }

    this.trenutnoVreme = new Date();



  }
  user: User = new User();
  nastavnik: User = new User();
  listaPredmeta: string[] = [];
  odabranPredmet: boolean = false;
  jedanPredmet: boolean = false;
  jediniPredmet: string = "";
  predmet: string = "";
  odabirPredmeta() {
    this.odabranPredmet = true;
  }

  casovi: SchoolClass[] = [];

  temaCas: string = "";

  datumVreme: string = "";
  datumVremeDate: Date | undefined

  krajCasa: Date | undefined;
  trenutnoVreme: Date | undefined;

  message: string = "";
  dupliCas: boolean = false;

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.dupliCas = true;
    } else {
      this.dupliCas = false;
    }

  }

  zauzet: boolean = false;
  minutiDodatak: number = 60;
  zakaziCas() {
    this.message = "";
    this.zauzet = false;
    this.minutiDodatak = 60;
    this.datumVremeDate = new Date(this.datumVreme);
    if (this.ranijiDatum(this.datumVremeDate, <Date>this.trenutnoVreme)) {
      this.message = "Термин је прошао."
      return;
    }

    if (this.datumVremeDate.getHours() < 8 || this.datumVremeDate.getHours() > 22) {
      this.message = "Могуће је заказати термин у периоду од 8-22h. ";
      return;
    }
    

    if (this.dupliCas) this.minutiDodatak = 120;

    this.krajCasa = new Date(this.datumVremeDate.getTime() + this.minutiDodatak * 60000);
    if (this.krajCasa.getHours() > 22) {
      this.message = "Термин се мора завршити до 22h. ";
      return;
    }

    if (this.jedanPredmet) this.predmet = this.jediniPredmet;

    for (let cas of this.casovi) {
      console.log(cas.pocetakCasa);
      console.log(cas.krajCasa)

      let casPocetak = new Date(cas.pocetakCasa);

      let casKraj = new Date(cas.krajCasa);


      console.log(casPocetak);
      console.log(casKraj)

      if (this.preklapanjeTermina(casPocetak, casKraj, this.datumVremeDate, this.krajCasa)) {
        this.message = "Термин је заузет. "
        this.zauzet = true;
        let pocetakSmene = 8;
        let krajSmene = 22;
        let nadjen = false;
        while (pocetakSmene < krajSmene - 1) {
          let proveraDana = new Date(this.datumVreme);
          proveraDana.setHours(pocetakSmene);
          let proveraKraj = new Date(proveraDana.getTime() + this.minutiDodatak * 60000);

          if (!this.preklapanjeTermina(proveraDana, proveraKraj, this.datumVremeDate, this.krajCasa)) {
            nadjen = true;
          } else {
            this.message = this.message + "Заузет термин од: " + pocetakSmene + "-" + (pocetakSmene + this.minutiDodatak / 60 + ". ");
          }
          pocetakSmene = pocetakSmene + 1;

        }
        if (nadjen) {
          this.message = this.message + "Наставник је слободан у току дана. "
          return;
        } 
        if (!nadjen) {
          this.message = "Наставник није слободан целог дана.";
        }
        pocetakSmene = 8;
        krajSmene = 22;
        let pocetakDan = this.datumVremeDate.getDate();
        let pocetakManje = pocetakDan - 1;
        let datumManje = new Date(this.datumVreme);
        datumManje.setDate(pocetakManje);


        while (this.istaNedelja(datumManje, this.datumVremeDate)) {
          let pocetakSmene = 8;
          let krajSmene = 22;
          let nadjen = false;
          while (pocetakSmene < krajSmene - 1) {
            datumManje.setHours(pocetakSmene);
            let datumManjeKraj = new Date(datumManje.getTime() + this.minutiDodatak * 60000);

            if (!this.preklapanjeTermina(datumManje, datumManjeKraj, this.datumVremeDate, this.krajCasa)) {
              nadjen = true;
              this.message = this.message + "Наставник је слободан тражене недеље."
              return;
            }
            pocetakSmene = pocetakSmene + 1;

          }
          pocetakManje = pocetakManje - 1;
          datumManje.setDate(pocetakManje);

        }

        if (!nadjen) {
          let pocetakVise = pocetakDan + 1;
          let datumVise = new Date(this.datumVreme);
          datumVise.setDate(pocetakVise);


          while (this.istaNedelja(datumVise, this.datumVremeDate)) {
            let pocetakSmene = 8;
            let krajSmene = 22;
            let nadjen = false;
            while (pocetakSmene < krajSmene - 1) {
              datumVise.setHours(pocetakSmene);
              let datumViseKraj = new Date(datumVise.getTime() + this.minutiDodatak * 60000);

              if (!this.preklapanjeTermina(datumVise, datumViseKraj, this.datumVremeDate, this.krajCasa)) {
                nadjen = true;
                this.message = this.message + "Наставник је слободан тражене недеље."
                return;
              }
              pocetakSmene = pocetakSmene + 1;

            }
            pocetakVise = pocetakVise + 1;
            datumVise.setDate(pocetakManje);

          }
        }

        this.message = this.message + "Наставник није слободан тражене недеље."

      }
    }

    if (!this.zauzet) {

      this.scheduleClassService.dodajZahtev(this.nastavnik.korisnickoIme, this.user.korisnickoIme,
        this.predmet, this.datumVremeDate.toISOString(), this.krajCasa.toISOString(), this.temaCas).subscribe(
          ok => {
            this.message = "Заказан час."
          }
        )
    }



  }

  ranijiDatum(date1: Date, date2: Date): boolean {

    return date1.getTime() - date2.getTime() < 0;
  }


  preklapanjeTermina(cas1Pocetak: Date, cas1Kraj: Date, cas2Pocetak: Date, cas2Kraj: Date): boolean {
    return cas1Pocetak < cas2Kraj && cas1Kraj > cas2Pocetak;
   // return (this.ranijiDatum(cas1Pocetak, cas2Kraj) && this.ranijiDatum(cas2Pocetak, cas1Pocetak)) ||
      (this.ranijiDatum(cas2Pocetak, cas1Kraj) && this.ranijiDatum(cas1Kraj, cas2Kraj));
  }

  istaNedelja(date1: Date, date2: Date): boolean {
    let dan = 24 * 60 * 60 * 1000;

    // Calculate the week number for each date
    let brojNedelje1 = Math.floor((date1.getTime() + dan) / (7 * dan));
    let brojNedelje2 = Math.floor((date2.getTime() + dan) / (7 * dan));

    // Compare the week numbers
    return brojNedelje1 === brojNedelje2;
  }






}
