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

  login() {
    this.userService.dohvatiKorisnika(this.korisnickoIme).subscribe(
      data => {
        if (data instanceof User) {
          sessionStorage.setItem("loggedIn", this.korisnickoIme); 
          this.u = data;
        }

        if (this.u.tip == 1) {
          // ucenik
          
        }
      }
    )
  }

}
