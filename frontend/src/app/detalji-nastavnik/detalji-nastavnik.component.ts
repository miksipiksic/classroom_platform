import { Component } from '@angular/core';
import User from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-detalji-nastavnik',
  templateUrl: './detalji-nastavnik.component.html',
  styleUrls: ['./detalji-nastavnik.component.css']
})
export class DetaljiNastavnikComponent {

  constructor(private userService: UserService) {}

  ngOnInit() {
    
    let loggedIn = localStorage.getItem("loggedIn");
    //this.userService.updateNavbar(this.loggedIn);
    let nastavnik = localStorage.getItem("detaljiNastavnik");
    console.log(loggedIn)
    if (nastavnik) {
      this.userService.dohvatiKorisnika(nastavnik).subscribe(
        u => {
          this.nastavnik = u;
        }
      )
    }
    if(loggedIn){
      this.userService.dohvatiKorisnika(loggedIn).subscribe(user=>{
        this.user= user;
      })
    }

  }
  user: User = new User();
  nastavnik: User = new User();


}
