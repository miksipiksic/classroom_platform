import { Component } from '@angular/core';
import { EngagementUser } from '../models/engagementUser';
import User from '../models/user';
import { Engagement } from '../models/engagement';
import { SchoolSubject } from '../models/schoolsubject';
import { UserService } from '../services/user.service';
import { EngagementService } from '../services/engagement.service';
import { SchoolsubjectService } from '../services/schoolsubject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ucenik-nastavnici',
  templateUrl: './ucenik-nastavnici.component.html',
  styleUrls: ['./ucenik-nastavnici.component.css']
})
export class UcenikNastavniciComponent {

  constructor(private userService: UserService,
    private engagementService: EngagementService,
    private schoolSubjectService: SchoolsubjectService,
    private router: Router) { }
  ngOnInit(): void {
    this.userService.dohvatiUcenike().subscribe(
      data => {
        this.ucenici = data;

        this.brojUcenika = this.ucenici.length;
      }
    )

    let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      this.userService.dohvatiKorisnika(loggedIn).subscribe(
        u => {
              this.user = u;
              this.schoolSubjectService.dohvatiPredmete().subscribe(
                data => {
              //    this.predmeti = data;
                  this.engagementService.dohvatiAngazovanja().subscribe(
                    engs => {
                      this.angazovanja = engs;

                      for (let angazovanje of this.angazovanja) {
                        let predmet = angazovanje.predmet;
                        let nastavnici: User[] = [];
                        for (let n of angazovanje.nastavnici) {

                          this.userService.dohvatiKorisnika(n).subscribe(
                            usr => {
                              let skola;
                              if (this.user.tipSkole.includes("средња")) {
                                skola = "средња";
                              } else {
                                skola = this.user.tipSkole;
                              }
                              let dodaj = false;
                              for (let u of usr.uzrast) {
                                if (u.toLowerCase().includes(skola)) {
                                  if (skola === "средња") {
                                    dodaj = true;
                                  } else {
                                    if (u.includes("1") && this.user.razred <= 4) {
                                      dodaj = true;
                                    }
                                    if (u.includes("5") && this.user.razred >= 5) {
                                      dodaj = true;
                                    }
                                  }
                                }
                              }
                              if (dodaj) {
                                nastavnici.push(usr);
                              }
                            }
                          )
                        }
                        let a = {
                          predmet: predmet,
                          nastavnici: nastavnici
                        }
                        this.angazovanjaUser.push(a);
                      }
                      this.angazovanjaUserSort = this.angazovanjaUser;
                      this.angazovanjaUserSearch = this.angazovanjaUser;
                      //this.resetPretraga();
                    }
                  )
                }
              )
        }
      )


    }






  }

  user: User = new User();

  searchIme: string = "";
  searchPrezime: string = "";
  searchPredmet: string = "";

  onSearch() {
    this.pretraga();
  }

  resetPretraga() {
    this.searchIme = '';
    this.searchPrezime = '';
    this.searchPredmet = '';
    this.pretraga();
  }

  pretraga() {
    this.angazovanjaUserSearch = this.angazovanjaUser;

    let searchImeString = this.searchIme;
    let searchPrezimeString = this.searchPrezime;
    let searchPredmetString = this.searchPredmet;

    this.filterItems(searchImeString, searchPrezimeString, searchPredmetString);
  }

  filterItems(ime: string, prezime: string, predmet: string) {
    this.angazovanjaUserSearch = this.angazovanjaUserSearch.filter((item) => {
      const predmetMatch = item.predmet.toLowerCase().includes(predmet.toLowerCase());
      const imeMatch = item.nastavnici.some((nast) => nast.ime.toLowerCase().includes(ime.toLowerCase()));
      const prezimeMatch = item.nastavnici.some((nast) => nast.prezime.toLowerCase().includes(prezime));

      console.log(item.predmet)
      console.log(predmetMatch)
      console.log(imeMatch)
      console.log(prezimeMatch)
      return predmetMatch && imeMatch && prezimeMatch;

    });

  }

  // Create the combined structure

  angazovanjaUser: EngagementUser[] = [];
  angazovanjaUserSort: EngagementUser[] = [];
  angazovanjaUserSearch: EngagementUser[] = []

  ucenici: User[] = [];
  brojUcenika: number = 0;
  brojNastavnika: number = 0;
  nastavnici: User[] = [];

 // predmeti: SchoolSubject[] = [];
  angazovanja: Engagement[] = [];
  angazovanjaSort: Engagement[] = [];

  uporediIme = (a: EngagementUser, b: EngagementUser): number => {
    let nastavnik1 = a.nastavnici.map(nastavnik => nastavnik.ime).join(', ');
    let nastavnik2 = b.nastavnici.map(nastavnik => nastavnik.ime).join(', ');

    return nastavnik1.localeCompare(nastavnik2);
  }

  uporediPrezime = (a: EngagementUser, b: EngagementUser): number => {
    let nastavnik1 = a.nastavnici.map(nastavnik => nastavnik.prezime).join(', ');
    let nastavnik2 = b.nastavnici.map(nastavnik => nastavnik.prezime).join(', ');

    return nastavnik1.localeCompare(nastavnik2);
  }

  uporediPredmete = (a: EngagementUser, b: EngagementUser): number => {
    return a.predmet.localeCompare(b.predmet);
  }


  sortImeRastuce() {
    //   this.angazovanjaUserSearch = this.angazovanjaUserSort;
    this.angazovanjaUserSearch.sort((a, b) => {
      let poredjenje = this.uporediIme(a, b);
      if (poredjenje !== 0) {
        return poredjenje
      }
      return this.uporediIme(a, b);
    })
  }


  sortImeOpadajuce() {
    //   this.angazovanjaUserSearch = this.angazovanjaUserSort;
    this.angazovanjaUserSearch.sort((a, b) => {
      let poredjenje = this.uporediIme(a, b);
      if (poredjenje !== 0) {
        return poredjenje
      }
      return this.uporediIme(a, b);
    })
    this.angazovanjaUserSearch.reverse();
  }

  sortPrezimeRastuce() {
    //   this.angazovanjaUserSearch = this.angazovanjaUserSort;
    this.angazovanjaUserSearch.sort((a, b) => {
      let poredjenje = this.uporediPrezime(a, b);
      if (poredjenje !== 0) {
        return poredjenje
      }
      return this.uporediPrezime(a, b);
    })
  }


  sortPrezimeOpadajuce() {

    //  this.angazovanjaUserSearch = this.angazovanjaUserSort;
    this.angazovanjaUserSearch.sort((a, b) => {
      let poredjenje = this.uporediPrezime(a, b);
      if (poredjenje !== 0) {
        return poredjenje
      }
      return this.uporediPrezime(a, b);
    })
    this.angazovanjaUserSearch.reverse();
  }

  sortPredmetRastuce() {
    //   this.angazovanjaUserSearch = this.angazovanjaUserSort;
    this.angazovanjaUserSearch.sort((a, b) => {
      let poredjenje = this.uporediPredmete(a, b);
      if (poredjenje !== 0) {
        return poredjenje
      }
      return this.uporediPredmete(a, b);
    })
  }


  sortPredmetOpadajuce() {
    //  this.angazovanjaUserSearch = this.angazovanjaUserSort;
    this.angazovanjaUserSearch.sort((a, b) => {
      let poredjenje = this.uporediPredmete(a, b);
      if (poredjenje !== 0) {
        return poredjenje
      }
      return this.uporediPredmete(a, b);
    })
    this.angazovanjaUserSearch.reverse();
  }

  pogledajDetalje(nastavnik: string) {
    localStorage.setItem("detaljiNastavnik", nastavnik);
  }

  odjaviSe() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  ucenikProfil() {
    this.router.navigate(['ucenik-profil'])
  }

  ucenikCasovi() {
    this.router.navigate(['ucenik-casovi'])
  }




}
