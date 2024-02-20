import { Component } from '@angular/core';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  constructor(private userService: UserService, private router: Router) { }

  korisnickoIme: string = "";
  lozinka: string = "";

  u: User = new User();
  message: string = "";

  login() {
    this.userService.dohvatiKorisnika(this.korisnickoIme).subscribe(
      data => {
        if (data!= null) {
          if (data.lozinka != this.lozinka)  {
            this.message = "Погрешна лозинка."
          }
          localStorage.setItem("loggedIn", this.korisnickoIme);
          this.u = data;

          if(this.u.tip == 0) {
            this.router.navigate(['admin'])
          } else {
            this.message = "Нисте адмиин."
          }
        } else {
          this.message = "Корисник не постоји."
        }


      }
    )
  }

}
