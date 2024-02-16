import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { Engagement } from '../models/engagement';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService) {}
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
        this.brojNastavnika = this.nastavnici.length;
      }
    )
    
  }

  
  ucenici!: User[];
  brojUcenika: number = 0;
  brojNastavnika: number = 0;
  nastavnici! : User[];
  
  angazovanja!: Engagement[];
  angazovanjaSort! : Engagement[];


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
