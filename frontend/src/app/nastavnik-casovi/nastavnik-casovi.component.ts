import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { ScheduleClassService } from '../services/schedule-class.service';
import { ClassReqUser } from '../models/classReqUser';
import { ScheduleClass } from '../models/scheduleClass';

@Component({
  selector: 'app-nastavnik-casovi',
  templateUrl: './nastavnik-casovi.component.html',
  styleUrls: ['./nastavnik-casovi.component.css']
})
export class NastavnikCasoviComponent {

  
  @ViewChild('myModal') myModal: any;
  constructor(private userService: UserService,
    private scheduleClassService: ScheduleClassService) { }

  ngOnInit(): void {
    this.scheduleClassService.dohvatiZahteve().subscribe(
      x => {
        this.zahteviCasovi = x;

        // let zhtv = new ClassReqUser();
        for (let zahtev of this.zahteviCasovi) {
          let ucenik = new User();
          let nastavnik = new User();
          this.userService.dohvatiKorisnika(zahtev.ucenik).subscribe(
            x => {
              ucenik = x;
              this.userService.dohvatiKorisnika(zahtev.nastavnik).subscribe(
                x => {
                  nastavnik = x;
                  let zhtv = {
                    ucenik: <User>ucenik,
                    nastavnik: <User>nastavnik,
                    pocetakCasa: zahtev.pocetakCasa,
                    krajCasa: zahtev.krajCasa,
                    tema: zahtev.tema,
                    predmet: zahtev.predmet
                  }

                  this.zahteviCasoviUser.push(zhtv);
                }
                  

              )
            }
          )



        }
      }
    )
  }

  zahteviCasovi: ScheduleClass[] = [];
  zahteviCasoviUser: ClassReqUser[] = [];


  odobriZahtev() {
    
  }

  odbijZahtev() {
    this.openModal();
  }

  izmeni() {
    // odbij zahtev
    
  }
  razlog: string = "";

  openModal() {
    // Show the modal
    this.myModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    // Hide the modal
    this.myModal.nativeElement.style.display = 'none';
  }

}
