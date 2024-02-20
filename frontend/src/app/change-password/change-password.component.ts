import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { Router } from '@angular/router';

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z][A-Za-z\d@$!%*?&]{5,9}$/;


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})


export class ChangePasswordComponent {

  constructor(private userService: UserService, private router: Router) {}

  znaStaru: boolean = true;
  staraLozinka: string = "";
  novaLozinka: string = "";
  potvrdaLozinka: string = "";

  staraLozinkaKorisnika = "";
  korisnickoIme = "";

  ngOnInit() {
    let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      this.userService.dohvatiKorisnika(loggedIn).subscribe(
        us => {
          this.u = us;
          this.korisnickoIme = this.u.korisnickoIme;
          this.staraLozinkaKorisnika = this.u.lozinka;
        }
      )
    }
  }

  unetaStara() {
    this.invalidStara = false;
    if (this.staraLozinkaKorisnika !== this.staraLozinka) {
      this.invalidStara = true;
    }
  }

  invalidNova: boolean = false;

  invalidPotvrda: boolean = false;

  unetaPotvrda() {
    this.invalidPotvrda = false;
    if (this.novaLozinka !== this.potvrdaLozinka) {
      this.invalidPotvrda = true;
    }
  }

  unetaNova() {
    this.invalidNova = false;
    if (!passwordRegex.test(this.novaLozinka)) {
      this.invalidNova = true;
    }
  }

  potvrdi() {

    if (!this.invalidNova && !this.invalidPotvrda && !this.invalidStara)
        this.userService.promeniLozinku(this.korisnickoIme, this.novaLozinka).subscribe(
          data=>{
            if(data.message=="ok") {
              this.message = "Промењена лозинка."
              this.router.navigate(['ucenik-profil'])
            }
          }
        )
  }
invalidStara: boolean = false;
  u: User = new User();

  bezbedonosnoPitanje: string = "";
  odgovor: string= "";
  odgovorNaPitanje: string = "";

  message: string = "";

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
