import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) { }

  korisnickoIme: string = "";
  lozinka: string = "";

  u: User = new User();
  message: string = "";

  unetoKorisnickoIme() {
    this.message = "";

  this.invalidIme= false;
  this.userService.dohvatiKorisnika(this.korisnickoIme).subscribe(
    u => {
      if (u.korisnickoIme == this.korisnickoIme) {
        this.invalidIme = false;
      } else {
        this.invalidIme = true;

        this.message = "Корисник не постоји."
      }
    }
  )
  }

  unetaLozinka() {
    this.message = "";

    this.invalidLozinka = false;
    this.userService.dohvatiKorisnika(this.korisnickoIme).subscribe(
      u => {
        if (u.lozinka == this.lozinka) {
          this.invalidLozinka = false;

        } else {
          this.invalidLozinka = true;
          this.message = "Погрешна лозинка."
        }
      }
    )
  }
  invalidIme: boolean = true;
  invalidLozinka: boolean = true;

  login() {
    if (!this.invalidIme && !this.invalidLozinka) {
      this.userService.dohvatiKorisnika(this.korisnickoIme).subscribe(
        ok => {
          this.u = ok;
          localStorage.setItem("loggedIn", this.korisnickoIme);
          if (this.u.tip == 1) {

            this.router.navigate(['ucenik-profil']);
          }
          if(this.u.tip == 2) {
            this.router.navigate(['nastavnik-profil'])
          }
          if (this.u.tip == 0) {
            this.message = "Корисник је админ."
            return;
          }

        }
      )


      }

  }

}
