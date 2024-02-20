import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SchoolClassService } from '../services/school-class.service';
import { SchoolSubject } from '../models/schoolsubject';
import { SchoolClassUser } from '../models/schoolClassUser';
import { SchoolsubjectService } from '../services/schoolsubject.service';


const generateRandomDate = () => {
  const year = 2023;
  const month = Math.floor(Math.random() * 12) + 1; // Random month between 1 and 12
  const day = Math.floor(Math.random() * 28) + 1; // Assuming all months have max 28 days for simplicity
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);

  return new Date(year, month - 1, day, hours, minutes, seconds);
};

const saveToFile = (data: any) => {
 // fs.writeFileSync('generatedData.json', JSON.stringify(data, null, 2), 'utf8');
};

@Component({
  selector: 'app-create-json',
  templateUrl: './create-json.component.html',
  styleUrls: ['./create-json.component.css']
})
export class CreateJSONComponent {
  /*

 constructor( private userService: UserService, private casoviService: SchoolClassService, private predmetiService: SchoolsubjectService
  ) {}

  predmeti: string[] = [];

  ucenici: string []  = []
  nastavnici: string[] = []
  casovi: SchoolClassUser[] = [];
  ngOnInit() {

    this.predmetiService.dohvatiPredmete().subscribe(
      data => {
        for (let p of data) {
          this.predmeti.push(p.imePredmeta);
        }
      }
    )

    this.userService.dohvatiUcenike().subscribe(
      data => {
        for (let u of data) {
          this.ucenici.push(u.korisnickoIme);
        }
      }
    )

    this.userService.dohvatiNastavnike().subscribe(
      data => {
        for (let n of data) {
          this.nastavnici.push(n.korisnickoIme);
        }
      }
    )

    
    let numberOfDocuments = 150;
    let data = [];
  
    for (let i = 0; i < numberOfDocuments; i++) {
      let document = this.generateDocument(i);
      data.push(document);
    }

    saveToFile(data);
  }
  generateDocument(index: number) {
    let startDate = generateRandomDate();
    let endDate = new Date(startDate.getTime() + Math.floor(Math.random() * 7200000)); // Adding random duration (up to 2 hours)
    let indexNastavnik =  Math.floor(Math.random() * this.nastavnici.length);
    let indexUcenik =  Math.floor(Math.random() * this.ucenici.length);
    let indexPredmet = Math.floor(Math.random() * this.predmeti.length);
    let document = {
      nastavnik: this.nastavnici[indexNastavnik],
      ucenik: this.ucenici[indexUcenik],
      predmet: this.predmeti[indexPredmet],
      pocetakCasa: startDate.toISOString(),
      krajCasa: endDate.toISOString(),
      tema: `Тема`,
      odradjen: true,
      __v: 0
    };
  
    return document;
  };
  
  
  
  */
  

}
