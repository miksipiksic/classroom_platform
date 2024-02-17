import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { Engagement } from '../models/engagement';
import { EngagementService } from '../services/engagement.service';
import { SchoolsubjectService } from '../services/schoolsubject.service';
import { SchoolSubject } from '../models/schoolsubject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService,
    private engagementService: EngagementService,
    private schoolSubjectService: SchoolsubjectService) {}
  ngOnInit() : void {
    this.userService.dohvatiUcenike().subscribe(
      data => {
        this.ucenici = data;
        
      this.brojUcenika = this.ucenici.length;
      }
    )

    this.userService.dohvatiNastavnike().subscribe(
      data => {
        this.nastavnici = data;
        this.nastavnici = this.nastavnici.filter((value) => value.prihvacen !== 2);
        
        this.brojNastavnika = this.nastavnici.length;
      }
    )

    

    this.schoolSubjectService.dohvatiPredmete().subscribe(
      data => {
        this.predmeti = data;
        for (let p of this.predmeti) {
          this.recnikPredmeti.push(p.imePredmeta);
        }
        this.engagementService.dohvatiAngazovanja().subscribe(
          data => {
            this.angazovanja = data;
            for (let p of this.recnikPredmeti) {
              for (let n of this.angazovanja) {
                if (n.predmet.imePredmeta == p)
                  this.recnikPredmetNastavnik[p].push(n.nastavnik.ime + " " + n.nastavnik.prezime);
              }
            }
          }
        )
      }
    )

    
    
  }

  
  ucenici: User[] = [];
  brojUcenika: number = 0;
  brojNastavnika: number = 0;
  nastavnici : User[] = [];

  predmeti: SchoolSubject[] = [];  
  angazovanja: Engagement[] = [];
  angazovanjaSort : Engagement[] = [];

  recnikPredmeti: string[] = [];
  recnikNastavnici: string[] = []
  recnikPredmetNastavnik:  { [key: string]: string[] }  = {
    
    
  }
  


  sortImeRastuce() {
   // this.nastavniciSort.sort((a, b) => a.ime.localeCompare(b.ime));
  }


  sortImeOpadajuce() {
  //  this.nastavniciSort.sort((a, b) => b.ime.localeCompare(a.ime));
  }

  sortPrzimeRastuce() {
   // this.nastavniciSort.sort((a, b) => a.prezime.localeCompare(b.prezime));
  }


  sortPrezimeOpadajuce() {
   // this.nastavniciSort.sort((a, b) => b.prezime.localeCompare(a.prezime));
  }

  sortPredmetRastuce() {
   // this.nastavniciSort.sort((a, b) => a.predmet.localeCompare(b.predmet));
  }


  sortPredmetOpadajuce() {
  //  this.nastavniciSort.sort((a, b) => b.predmet.localeCompare(a.predmet));
  }



}
