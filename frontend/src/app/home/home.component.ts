import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';

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
      }
    )
    


  }

  
  ucenici!: User[];
  brojUcenika: number = 0;

  nastavnici! : User[];


}
