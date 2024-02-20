import { Component } from '@angular/core';
import { SchoolClassService } from '../services/school-class.service';
import { UserService } from '../services/user.service';
import { EngagementService } from '../services/engagement.service';
import { Engagement } from '../models/engagement';
import { ChartOptions, ChartType, LabelItem } from 'chart.js';
import { SchoolClass } from '../models/schoolClass';
import User from '../models/user';
import Chart, { ChartDataset } from 'chart.js/auto';

@Component({
  selector: 'app-diagram-lines',
  templateUrl: './diagram-lines.component.html',
  styleUrls: ['./diagram-lines.component.css']
})
export class DiagramLinesComponent {
  
  constructor(private engagementService: EngagementService,
    private userService: UserService,
    private schoolClassService: SchoolClassService) {}


    nastavniciCasoviMesec: { [key: string]: number[] } = {
    };

    nastavniciCasovi: { [key: string]: number } = {
    };


chart: any;
    casovi: SchoolClass[] = []
    nastavnici: string[] = []
    brojCasova: number[][] = [];
    brojUkupnihCasova: number[] = [];
    nastavniciTop10: string[] = [];
    ngOnInit() {
      this.schoolClassService.dohvatiCasove().subscribe(
        data => {
          this.casovi = data;
          this.userService.dohvatiNastavnike().subscribe(
            n => {
              console.log("dodavanje nastavnika")
              for (let nas of n) {
                
                if (nas.prihvacen != 2) {
                  this.nastavnici.push(nas.korisnickoIme);
                  this.brojUkupnihCasova.push(0);
                  console.log(nas.korisnickoIme);
                }
              }

              this.nastavniciCasovi= this.kreirajRecnik(this.nastavnici, this.brojUkupnihCasova);
              console.log(this.nastavniciCasovi);
              console.log("dodavanje brojeva ukupnih casova")
              for (let cas of this.casovi) {
                this.nastavniciCasovi[cas.nastavnik] = this.nastavniciCasovi[cas.nastavnik] + 1;
                console.log(cas.nastavnik + " " + this.nastavniciCasovi[cas.nastavnik])
              }

              let nastavniciCasoviLista = Object.entries(this.nastavniciCasovi);

// Sort the array based on values
            nastavniciCasoviLista.sort((a, b) => b[1] - a[1]); // Descending order, change to a[1] - b[1] for ascending
console.log(nastavniciCasoviLista[0][0])
// Extract the first 10 items
              let i = 0
              console.log("ispis top 10")
            for (let t of nastavniciCasoviLista) {
              if (i == 10) break;
              this.nastavniciTop10.push(t[0]);
              this.brojCasova.push([0,0,0,0,0,0,0,0,0,0, 0,0]);
              console.log(t)
              console.log(t[0]);
              i = i + 1;
            }

            
            this.nastavniciCasoviMesec = this.kreirajRecnik1(this.nastavniciTop10, this.brojCasova);
            console.log("izdavajanje broja po mesecima")
            for (let cas of this.casovi) {
              let datum = new Date(cas.pocetakCasa);
              if (datum.getFullYear() == 2023) {
              let mesec = datum.getMonth();
                console.log(mesec)
              console.log(this.nastavniciCasoviMesec);
              console.log(cas.nastavnik);
              console.log(this.nastavniciCasoviMesec[cas.nastavnik])
              
              this.nastavniciCasoviMesec[cas.nastavnik][mesec] = this.nastavniciCasoviMesec[cas.nastavnik][mesec] + 1;
              console.log()
              console.log(this.nastavniciCasoviMesec[cas.nastavnik][mesec])
              console.log("-----");
            }
            }

            // kreiran recnik
            
            let backgroundColors = this.nastavniciTop10.map(() => '#' + Math.floor(Math.random()*16777215).toString(16));
            let datasetsR = [];

            for (let n of this.nastavniciTop10) {
              let i = 0
              datasetsR.push({
              label: n,
              data: this.nastavniciCasoviMesec[n],
            backgroundColor: '#' + Math.floor(Math.random()*(16777215-i)).toString(16)
            });
            i = i + 1;
}

            this.chart = new Chart("MyChart", {
              type: 'line', //this denotes tha type of chart
        
              data: {// values on X-Axis
                labels: ['јануар', 'фебруар', 'март','април',
                         'мај', 'јун', 'јул','август', 'септембар', 'октобар', 'новембар', 'децембар' ], 

                         
            //  label: '',
           //   data: [this.recnikPolNastavnici["Ж"], this.recnikPolNastavnici["М"]],
                 datasets: datasetsR
              },
              options: {
                aspectRatio:2.5
              }
              
            });


              
    
            }
          )
          
        }
      )
    }

    kreirajRecnik1(keys: string[], values: number[][]): Record<string,number[]> {
      const recnik: Record<string, number[]> = {};
  
      keys.forEach((key, index) => {
          recnik[key] = values[index];
      });
  
      return recnik;
  }

    kreirajRecnik(keys: string[], values: number[]): Record<string,number> {
      const recnik: Record<string, number> = {};
  
      keys.forEach((key, index) => {
          recnik[key] = values[index];
      });
  
      return recnik;
  }
/*
  ngOnInit() {

    this.schoolClassService.dohvatiCasove().subscribe(
      casovi => {
        for (let cas of casovi) {
          let datum = new Date(cas.pocetakCasa);
          let godina = datum.getFullYear();
          if (godina == 2023) {
            if (datum.getDay() == 0) {
              this.daniRecnik["НЕД"] = this.daniRecnik["НЕД"] + 1;
            }
            if (datum.getDay() ==1) {
              this.daniRecnik["ПОН"] = this.daniRecnik["ПОН"] + 1;
            }
            if (datum.getDay() ==2) {
              this.daniRecnik["УТО"] = this.daniRecnik["УТО"] + 1;
            }
            if (datum.getDay() ==3) {
              this.daniRecnik["СРЕ"] = this.daniRecnik["СРЕ"] + 1;
            }
            if (datum.getDay() ==4) {
              this.daniRecnik["ЧЕТ"] = this.daniRecnik["ЧЕТ"] + 1;
            }
            if (datum.getDay() ==5) {
              this.daniRecnik["ПЕТ"] = this.daniRecnik["ПЕТ"] + 1;
            }
            if (datum.getDay() ==6) {
              this.daniRecnik["СУБ"] = this.daniRecnik["СУБ"] + 1;
            }
          }
        }

        this.daniRecnik["НЕД"] = this.daniRecnik["НЕД"] / 52;
        this.daniRecnik["ПОН"] = this.daniRecnik["ПОН"] / 52;
        this.daniRecnik["УТО"] = this.daniRecnik["УТО"] / 52;
        this.daniRecnik["СРЕ"] = this.daniRecnik["СРЕ"] / 52;
        this.daniRecnik["ЧЕТ"] = this.daniRecnik["ЧЕТ"] / 52;
        this.daniRecnik["ПЕТ"] = this.daniRecnik["ПЕТ"] / 52;
        this.daniRecnik["СУБ"] = this.daniRecnik["СУБ"] / 52;

        let daniLabels = Object.keys(this.daniRecnik);
        let daniDataSet =daniLabels.map(label => ({
          data: this.daniRecnik[label],
          label: label,
        }));
        this.barChartData = [...daniDataSet];

      }
    )
  }


  /*

        let    predmetiLabels = Object.keys(this.predmetiRecnik);
let uzrastLabels = Object.keys(this.uzrastRecnik);

// Create data sets for subjects
let predmetiDataSet =predmetiLabels.map(label => ({
  data: this.predmetiRecnik[label],
  label: label,
}));

// Create data sets for grades
let uzrastDataSet = uzrastLabels.map(label => ({
  data: this.uzrastRecnik[label],
  label: label,
}));


            // napravljena oba recnika
            this.barChartData = [...predmetiDataSet, ...uzrastDataSet];

          }
        )


      }
    )


  }
  */

  /*


  daniRecnik: {[key:string]: number} = {
    "ПОН": 0,
    "УТО": 0,
    "СРЕ": 0,
    "ЧЕТ": 0,
    "ПЕТ": 0,
    "СУБ": 0,
    "НЕД": 0
  }

  predmeti: string[] = [];
  brojNastavnikPredmeti: number[] = [];
  listaAngazovanja: Engagement[] = []

  kreirajRecnik(keys: string[], values: number[]): Record<string, number> {
    const recnik: Record<string, number> = {};

    keys.forEach((key, index) => {
        recnik[key] = values[index];
    });

    return recnik;
}






// Combine both data sets into barChartData
barChartData :any[] = [];

barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: LabelItem[] = [];

  barChartLegend = true;
  barChartPlugins = [];

chart: any;
*/

}
