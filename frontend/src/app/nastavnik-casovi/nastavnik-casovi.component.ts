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
import { Router } from '@angular/router';


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
    private schoolClassService: SchoolClassService, private router: Router) { }


    krajForPetlje: boolean = false;
  ngOnInit(): void {

    let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      this.userService.dohvatiKorisnika(loggedIn).subscribe(
        usr => {
            this.user = usr;
            
      this.kreirajCasove();
        }
      )
    }

    

    
        
 }

 sortiraniPrvih5: SchoolClass[] = []

casoviSortiraniPrvih5: SchoolClassUser[] = [];


  
kreirajCasove() {
  this.schoolClassService.dohvatiCasove().subscribe(
    x=> {

      for (let cas of x) {
        if (cas.nastavnik == this.user.korisnickoIme && cas.odradjen == false) {
          this.casovi.push(cas);
        }
      }
       // let zhtv = new ClassReqUser();
       this.casovi.sort((a, b)=> {
        let aPocetak = new Date(a.pocetakCasa);
        let bPocetak = new Date(b.pocetakCasa);
        if (this.ranijiDatum(aPocetak, bPocetak)) {
          return -1; 
        } else if (this.ranijiDatum(bPocetak, aPocetak)) {
          return 1; 
        } else {
          return 0; 
        }
      });

      this.trenutnoVreme = new Date();

    for (let cas of this.casovi) {
      console.log(cas.pocetakCasa);
    }

    let triDanaKasnije = new Date(this.trenutnoVreme.getTime() + (3 * 24 * 60 * 60 * 1000));
    console.log("tri dana Kasnije: " +triDanaKasnije);
    this.casovi = this.casovi.filter(cas => {
      let pocetakCasa = new Date(cas.pocetakCasa);
      return pocetakCasa.getTime() <= triDanaKasnije.getTime()
    });
    let i = 0;
    for (let c of this.casovi) {
      if (i == 5) break;
     // this.casoviSortiraniPrvih5.push(c);
     this.sortiraniPrvih5.push(c);
      console.log(c.pocetakCasa);
      i = i + 1;
    }

    for (let c of this.sortiraniPrvih5) {
      this.userService.dohvatiKorisnika(c.ucenik).subscribe(
        u => {
          let ucenik = u;
          this.userService.dohvatiKorisnika(c.nastavnik).subscribe(
            p => {
              let prof = p;
              let uCas = {
                ucenik: <User>ucenik,
                nastavnik: c.nastavnik,
                pocetakCasa: new Date(c.pocetakCasa),
                  krajCasa: c.krajCasa,
                  tema: c.tema,
                  predmet: c.predmet, 
                  odradjen: c.odradjen
              }

              this.casoviSortiraniPrvih5.push(uCas);
            }
          )
        }
      )
    }

    this.kreirajZahteve();
      

      }
)
}

sortiraj() {
  this.sortiraniPrvih5 = [];
  this.casoviSortiraniPrvih5 = [];
  let triDanaKasnije = new Date(this.trenutnoVreme.getTime() + (3 * 24 * 60 * 60 * 1000));
    console.log("tri dana Kasnije: " +triDanaKasnije);
    this.casovi = this.casovi.filter(cas => {
      let pocetakCasa = new Date(cas.pocetakCasa);
      return pocetakCasa.getTime() <= triDanaKasnije.getTime()
    });
    let i = 0;
    for (let c of this.casovi) {
      if (i == 5) break;
     // this.casoviSortiraniPrvih5.push(c);
     this.sortiraniPrvih5.push(c);
      console.log(c.pocetakCasa);
      i = i + 1;
    }

    for (let c of this.sortiraniPrvih5) {
      this.userService.dohvatiKorisnika(c.ucenik).subscribe(
        u => {
          let ucenik = u;
          this.userService.dohvatiKorisnika(c.nastavnik).subscribe(
            p => {
              let prof = p;
              let uCas = {
                ucenik: <User>ucenik,
                nastavnik: c.nastavnik,
                pocetakCasa: new Date(c.pocetakCasa),
                  krajCasa: c.krajCasa,
                  tema: c.tema,
                  predmet: c.predmet, 
                  odradjen: c.odradjen
              }

              this.casoviSortiraniPrvih5.push(uCas);
            }
          )
        }
      )
    }


}

  kreirajZahteve() {
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

  ranijiDatum(date1: Date, date2: Date): boolean {

    return date1.getTime() - date2.getTime() < 0;
  }

  pridruziSe(cas: SchoolClassUser) {
    console.log(cas.nastavnik)
    console.log(cas.pocetakCasa.toISOString())
    this.schoolClassService.odradiCas(cas.nastavnik, cas.pocetakCasa.toISOString()).subscribe(
        ok => {
          console.log("odradjen cas")
          
          this.casovi = this.casovi.filter((value) => {
            return cas.nastavnik != value.nastavnik && cas.pocetakCasa.toISOString() != value.pocetakCasa;
          })
          this.casoviUser = this.casoviUser.filter((value)=> {
            return cas.nastavnik != value.nastavnik && value.pocetakCasa != cas.pocetakCasa;
          })

          this.sortiraj();
        }
      )
  }
  unetoObrazlozenje: boolean = false;
  unesiObrazlozenje() {
    this.unetoObrazlozenje = true;
  }
  zahteviCasovi: ScheduleClass[] = [];
  zahteviCasoviUser: ClassReqUser[] = [];
  ucenikOcene: number[] = [];
  prosecnaOcena: number = 0;

  imaViseOdTriOcene: boolean = false;

  user: User = new User();

  odobravanje: boolean = false;
  neodobravanje: boolean = false;

  odobriZahtev(zahtev: ClassReqUser) {
    console.log("prihvata Cas")
    this.odobravanje = true;
    console.log(zahtev.pocetakCasa);
    console.log(zahtev.nastavnik.korisnickoIme);
    this.scheduleClassService.prihvatiZahtev(zahtev.nastavnik.korisnickoIme,zahtev.pocetakCasa ).subscribe(

        ok => {
          console.log("prihvacen cas")
          console.log(ok.message)
          console.log()
          this.zahteviCasoviUser.filter((value)=> value.prihvacen !== 1); // obradjen
          this.schoolClassService.dodajCas(zahtev.nastavnik.korisnickoIme,
            zahtev.ucenik.korisnickoIme, zahtev.predmet,
            zahtev.pocetakCasa, zahtev.krajCasa,
            zahtev.tema, false).subscribe(
              ok => {
                
                let cas = {
                  ucenik: <User>zahtev.ucenik,
                  nastavnik:zahtev.nastavnik.korisnickoIme,
                  pocetakCasa: new Date(zahtev.pocetakCasa),
                  krajCasa: zahtev.krajCasa,
                  tema:zahtev.tema, odradjen: false,
                  predmet: zahtev.predmet

                }
                let casO = {
                  ucenik: zahtev.ucenik.korisnickoIme,
                  nastavnik:zahtev.nastavnik.korisnickoIme,
                  pocetakCasa: zahtev.pocetakCasa,
                  krajCasa: zahtev.krajCasa,
                  tema:zahtev.tema, odradjen: false,
                  predmet: zahtev.predmet
                }
                this.casovi.push(casO);
                this.casoviUser.push(cas);
                this.sortiraj();
                console.log("dodat cas");
              //  this.zahteviCasoviUser.filter((value)=> value.prihvacen !== 1); // obradjen
                this.zahteviCasoviUser.filter((value)=> {
                  return (value.nastavnik.korisnickoIme == this.zahtev.nastavnik.korisnickoIme
                    && this.zahtev.pocetakCasa == value.pocetakCasa);
                });
                

                this.scheduleClassService.obrisiZahtev(zahtev.nastavnik.korisnickoIme, zahtev.pocetakCasa).subscribe(
                  ok => {
                    
                this.zahteviCasoviUser = [];
                
                this.kreirajZahteve();
                this.odbijanje = false;
                this.odobravanje = false;
                  }
                )
              }
            )




        }
      )



  }

  casoviUser: SchoolClassUser[] = [];
  casovi: SchoolClass[] = [];
  message: string = "";
odbijanje: boolean = false;
  odbijZahtev(zahtev: ClassReqUser) {
    this.neodobravanje = !this.neodobravanje;
    this.odbijanje = !this.odbijanje;
    this.message = "odbijanje";
    this.zahtev = zahtev;
  //  this.openModal();
  }

  zahtev: ClassReqUser = new ClassReqUser();

  zahtevZaObradu: ClassReqUser = new ClassReqUser();

  izmeni() {
    // odbij zahtev
    this.message = "izmena";
    this.scheduleClassService.odbijZahtev(this.zahtev.nastavnik.korisnickoIme,this.zahtev.pocetakCasa, this.razlog).subscribe(
        ok => {
       //   this.closeModal();
       
       
       this.scheduleClassService.obrisiZahtev(this.zahtev.nastavnik.korisnickoIme, this.zahtev.pocetakCasa).subscribe(
        ok => {
          
       this.zahteviCasoviUser = [];
       this.kreirajZahteve();
       this.odbijanje = false;
       this.odobravanje = false;
        }
      )
      
        }
      )


      // odbijen
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
