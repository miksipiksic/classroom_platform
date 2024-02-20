import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { EngagementService } from '../services/engagement.service';
import { SchoolsubjectService } from '../services/schoolsubject.service';
import { Router } from '@angular/router';
import { SchoolClassService } from '../services/school-class.service';
import User from '../models/user';
import { SchoolClassUser } from '../models/schoolClassUser';
import { SchoolClass } from '../models/schoolClass';
import { CasDate } from '../models/casoviDate';

@Component({
  selector: 'app-ucenik-casovi',
  templateUrl: './ucenik-casovi.component.html',
  styleUrls: ['./ucenik-casovi.component.css']
})
export class UcenikCasoviComponent {
  constructor(private userService: UserService,
    private engagementService: EngagementService,
    private schoolSubjectService: SchoolsubjectService,

    private schoolClassService: SchoolClassService,
    private router: Router) { }

    ngOnInit() {

      let loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      this.userService.dohvatiKorisnika(loggedIn).subscribe(
        usr => {
            this.user = usr;
        }
      )
    }

      this.schoolClassService.dohvatiCasove().subscribe(
        x=> {
          this.casovi = x;
          this.casovi.filter((value) => value.ucenik == this.user.korisnickoIme);
          for (let cas of this.casovi) {
            let dat = new Date(cas.pocetakCasa);
            let dk = new Date(cas.krajCasa)
            let c = {
              nastavnik: cas.nastavnik,
              odradjen: cas.odradjen,
              ucenik: cas.ucenik,
              pocetakCasa: dat,
              krajCasa: cas.krajCasa,
              tema: cas.tema,
              predmet: cas.predmet

            }
            this.casoviDate.push(c);
          }

        }
      )

    }

    casoviUser: SchoolClassUser[] = [];
    casovi: SchoolClass[] = [];
    casoviDate: CasDate[] = [];

  user: User = new User();

    odjaviSe() {
      localStorage.clear();
      this.router.navigate(['']);
    }

    ucenikProfil() {
      this.router.navigate(['ucenik-profil'])
    }

    ucenikNastavnici() {
      this.router.navigate(['ucenik-nastavnici'])
    }

}
