import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { ScheduleClassService } from '../services/schedule-class.service';
import { ClassReqUser } from '../models/classReqUser';
import { ScheduleClass } from '../models/scheduleClass';
import { Grade } from '../models/grade';
import { GradesService } from '../services/grades.service';
import { SchoolClassService } from '../services/school-class.service';
import { SchoolClass } from '../models/schoolClass';
import { SchoolClassUser } from '../models/schoolClassUser';

@Component({
  selector: 'app-nastavnik-casovi',
  templateUrl: './nastavnik-casovi.component.html',
  styleUrls: ['./nastavnik-casovi.component.css']
})
export class NastavnikCasoviComponent {

  
  @ViewChild('myModal') myModal: any;
  constructor(private userService: UserService,
    private scheduleClassService: ScheduleClassService,
    private gradesService: GradesService,
    private schoolClassService: SchoolClassService) { }

  ngOnInit(): void {

    let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      this.userService.dohvatiKorisnika(loggedIn).subscribe(
        usr => {
            this.user = usr;
        }
      )
    }

    this.schoolClassService.dohvatiCasove().subscribe(
      x=> {
        this.casovi = x;
         // let zhtv = new ClassReqUser();
         for (let cas of this.casovi) {
          if (cas.odradjen == false ) { // neobradjeni
          if (cas.nastavnik == this.user.korisnickoIme) {
          let ucenik = new User();
          let nastavnik = new User();
          this.userService.dohvatiKorisnika(cas.ucenik).subscribe(
            x => {
              ucenik = x;
              
              this.userService.dohvatiKorisnika(this.user.korisnickoIme).subscribe(
                x => {
                  nastavnik = x;
                  let c = {
                    ucenik: <User>ucenik,
                    nastavnik: nastavnik.korisnickoIme,
                    pocetakCasa: cas.pocetakCasa,
                    krajCasa: cas.krajCasa,
                    tema: cas.tema,
                    predmet: cas.predmet,
                    odradjen: false
                  }

                  this.casoviUser.push(c);
                }
                  

              )
            }
          )
        }


        }}
        this.casoviUserSortirani = this.casoviUser;
        this.casoviUserSortirani.sort((a, b)=> {
          let aPocetak = new Date(a.pocetakCasa);
          let bPocetak = new Date(b.pocetakCasa);
          if (this.ranijiDatum(aPocetak, bPocetak)) {
            return -1; // date1 comes before date2
          } else if (this.ranijiDatum(bPocetak, aPocetak)) {
            return 1; // date1 comes after date2
          } else {
            return 0; // dates are equal
          }
        });

        // filtriraj da budu u naredna tri dana
        this.trenutnoVreme = new Date();

        let triDanaKasnije = new Date(this.trenutnoVreme.getTime() + (3 * 24 * 60 * 60 * 1000));
        this.casoviUserSortirani = this.casoviUserSortirani.filter(cas => {
          let pocetakCasa = new Date(cas.pocetakCasa);
          return pocetakCasa.getTime() <= triDanaKasnije.getTime()
        });
        let i = 0;
        for (let c of this.casoviUserSortirani) {
          if (i == 5) break;
          this.casoviSortiraniPrvih5.push(c);
          i = i + 1;
        }

      }
    )

    

    this.scheduleClassService.dohvatiZahteve().subscribe(
      x => {
        this.zahteviCasovi = x;

        // let zhtv = new ClassReqUser();
        for (let zahtev of this.zahteviCasovi) {
          if (zahtev.prihvacen == 0 ) { // neobradjeni
          if (zahtev.nastavnik == this.user.korisnickoIme) {
          let ucenik = new User();
          let nastavnik = new User();
          this.userService.dohvatiKorisnika(zahtev.ucenik).subscribe(
            x => {
              ucenik = x;
              this.gradesService.dohvatiOcene(x.korisnickoIme).subscribe(
                x => {
                  if (x.length >= 3) {
                    this.imaViseOdTriOcene = true;
                  for (let ocena of x) {
                    this.ucenikOcene.push(ocena.ocena);
                    this.prosecnaOcena += ocena.ocena;
                  }
                  this.prosecnaOcena = this.prosecnaOcena / x.length;
                }
                }
              )
              this.userService.dohvatiKorisnika(this.user.korisnickoIme).subscribe(
                x => {
                  nastavnik = x;
                  let zhtv = {
                    ucenik: <User>ucenik,
                    nastavnik: <User>nastavnik,
                    pocetakCasa: zahtev.pocetakCasa,
                    krajCasa: zahtev.krajCasa,
                    tema: zahtev.tema,
                    predmet: zahtev.predmet,
                    prosecnaOcena: this.prosecnaOcena,
                    prihvacen: zahtev.prihvacen
                  }

                  this.zahteviCasoviUser.push(zhtv);
                }
                  

              )
            }
          )
        }


        }}
      }


    )
  }

  trenutnoVreme: Date = new Date();

  casoviUserSortirani: SchoolClassUser[] = [];
  casoviSortiraniPrvih5: SchoolClassUser[] = [];

  ranijiDatum(date1: Date, date2: Date): boolean {

    return date1.getTime() - date2.getTime() < 0;
  }

  pridruziSe(cas: SchoolClassUser) {
    this.schoolClassService.odradiCas(cas.nastavnik, cas.ucenik.korisnickoIme,
      cas.predmet, cas.pocetakCasa, true).subscribe(
        ok => {
          this.casoviUser.filter((value)=> value.odradjen !== true);
          this.casoviUserSortirani = this.casoviUser;
        this.casoviUserSortirani.sort((a, b)=> {
          let aPocetak = new Date(a.pocetakCasa);
          let bPocetak = new Date(b.pocetakCasa);
          if (this.ranijiDatum(aPocetak, bPocetak)) {
            return -1; // date1 comes before date2
          } else if (this.ranijiDatum(bPocetak, aPocetak)) {
            return 1; // date1 comes after date2
          } else {
            return 0; // dates are equal
          }
        });

        // filtriraj da budu u naredna tri dana
        this.trenutnoVreme = new Date();

        let triDanaKasnije = new Date(this.trenutnoVreme.getTime() + (3 * 24 * 60 * 60 * 1000));
        this.casoviUserSortirani = this.casoviUserSortirani.filter(cas => {
          let pocetakCasa = new Date(cas.pocetakCasa);
          return pocetakCasa.getTime() <= triDanaKasnije.getTime()
        });
        let i = 0;
        for (let c of this.casoviUserSortirani) {
          if (i == 5) break;
          this.casoviSortiraniPrvih5.push(c);
          i = i + 1;
        }
        }
      )
  }
  unetoObrazlozenje: boolean = false;
  unesiObrazlozenje() {
    this.unetoObrazlozenje = false;
    if (this.razlog !== "") {
      this.unetoObrazlozenje = true;
    }
  }
  zahteviCasovi: ScheduleClass[] = [];
  zahteviCasoviUser: ClassReqUser[] = [];
  ucenikOcene: number[] = [];
  prosecnaOcena: number = 0;

  imaViseOdTriOcene: boolean = false;

  user: User = new User();

  odobriZahtev(zahtev: ClassReqUser) {
    this.scheduleClassService.prihvatiZahtev(this.zahtevZaObradu.nastavnik.korisnickoIme,
      this.zahtevZaObradu.ucenik.korisnickoIme, this.zahtevZaObradu.pocetakCasa, this.zahtevZaObradu.krajCasa, this.zahtevZaObradu.tema, this.zahtevZaObradu.tema).subscribe(

        ok => {

        }
      )

      this.schoolClassService.dodajCas(this.zahtevZaObradu.nastavnik.korisnickoIme,
        this.zahtevZaObradu.ucenik.korisnickoIme, this.zahtevZaObradu.predmet,
        this.zahtevZaObradu.pocetakCasa, this.zahtevZaObradu.krajCasa,
        this.zahtevZaObradu.tema, false).subscribe(
          ok => {

            this.zahteviCasoviUser.filter((value)=> value.prihvacen !== 1); // obradjen
          }
        )
  }

  casoviUser: SchoolClassUser[] = [];
  casovi: SchoolClass[] = [];

  odbijZahtev(zahtev: ClassReqUser) {
    this.zahtevZaObradu = zahtev;
    this.openModal();
  }

  zahtevZaObradu: ClassReqUser = new ClassReqUser();

  izmeni() {
    // odbij zahtev
    this.scheduleClassService.odbijZahtev(this.zahtevZaObradu.nastavnik.korisnickoIme,
      this.zahtevZaObradu.ucenik.korisnickoIme, this.zahtevZaObradu.pocetakCasa, this.zahtevZaObradu.krajCasa, this.zahtevZaObradu.tema, this.zahtevZaObradu.tema, this.razlog).subscribe(
        ok => {
          this.zahteviCasoviUser.filter((value)=> value.prihvacen !== 2); // odbijen
        }
      )
  }
  razlog: string = "";

  openModal() {
    // Show the modal
    this.myModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    // Hide the modal
    this.myModal.nativeElement.style.display = 'none';
  }

}
