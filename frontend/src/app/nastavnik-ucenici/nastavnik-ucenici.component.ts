import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import User from '../models/user';
import { SchoolClassService } from '../services/school-class.service';

@Component({
  selector: 'app-nastavnik-ucenici',
  templateUrl: './nastavnik-ucenici.component.html',
  styleUrls: ['./nastavnik-ucenici.component.css']
})
export class NastavnikUceniciComponent {

  constructor(private userService: UserService, private router: Router, private casoviService: SchoolClassService) {}


  ngOnInit() {
    let loggedIn = localStorage.getItem("loggedIn");
if (loggedIn) {
  this.userService.dohvatiKorisnika(loggedIn).subscribe(
    ok => {
      this.user = ok;
      this.casoviService.dohvatiCasove().subscribe(
        c => {
          for (let cas of c) {
            if (cas.nastavnik == this.user.korisnickoIme) {
              this.userService.dohvatiKorisnika(cas.ucenik).subscribe(
                ok => {

                  this.mojiUcenici.push(ok);
                }
              )
            }
          }
        }
      )
    }

  )


}
  }

  mojiUcenici: User[] =[];
  user: User = new User();

}
