import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z][A-Za-z\d@$!%*?&]{5,9}$/;


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})


export class ChangePasswordComponent {

  constructor(private userService: UserService) {}

  znaStaru: boolean = true;
  staraLozinka: string = "";
  novaLozinka: string = "";
  potvrdaLozinka: string = "";

  staraLozinkaKorisnika = "";
  korisnickoIme = "";

  potvrdi() {
    this.userService.nadjiLozinku(this.korisnickoIme).subscribe(
      data => {
        this.staraLozinkaKorisnika = data;
      }
    )

    if (this.staraLozinkaKorisnika === this.staraLozinka) {
      if (this.novaLozinka === this.potvrdaLozinka) {
        if (!passwordRegex.test(this.novaLozinka)) {
          alert("Pogresan format.");
          return;
        }
        this.userService.promeniLozinku(this.korisnickoIme, this.novaLozinka).subscribe(
          data=>{
            if(data.message=="Lozinka promenjena.") alert("Lozinka promenjena.")
          }
        )
      }else {
        alert("Lozinke se ne poklapaju")
      }
    } else {
      alert("Pogresna stara lozinka.")
    }
  }

  u: User | undefined;

  bezbedonosnoPitanje: string = "";
  odgovor: string= "";
  odgovorNaPitanje: string = "";

  pitanje() {
    this.znaStaru = !this.znaStaru;
  }
  dalje: boolean = false;
  unetoKorisnickoIme() {
    alert(this.korisnickoIme)
    this.userService.dohvatiKorisnika(this.korisnickoIme).subscribe(
      data => {
        this.u = data;
        if (this.u != null) {
          this.dalje = !this.dalje;
        
        
          this.bezbedonosnoPitanje = this.u.bezbedonosnoPitanje;
          this.odgovorNaPitanje = this.u.odgovor;
        
        }  else {
          alert("Ne postoji korisnik")
        }
      }
    )
    
  }
  tacanOdgovor: boolean = false;
  potvrdiOdgovor() {
    if(this.odgovor == this.odgovorNaPitanje) {
    this.dalje = !this.dalje;
    this.tacanOdgovor = !this.tacanOdgovor;
  } else {
    alert("Pogresan odgovor");
  }
  }

  potvrdiNovu() {
    if (this.novaLozinka === this.potvrdaLozinka) {
      if (!passwordRegex.test(this.novaLozinka)) {
        alert("Pogresan format.");
        return;
      }
      this.userService.promeniLozinku(this.korisnickoIme, this.novaLozinka).subscribe(
        data=>{
          if(data.message=="Lozinka promenjena.") alert("Lozinka promenjena.")
        }
      )
    } else {
      alert("Lozinke se ne poklapaju");
    }
  }

}
