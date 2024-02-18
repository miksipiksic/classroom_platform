import { Component } from '@angular/core';
import { SchoolClassService } from '../services/school-class.service';
import { UserService } from '../services/user.service';
import { EngagementService } from '../services/engagement.service';
import { Engagement } from '../models/engagement';
import { ChartOptions, ChartType, LabelItem } from 'chart.js';

@Component({
  selector: 'app-diagram-lines',
  templateUrl: './diagram-lines.component.html',
  styleUrls: ['./diagram-lines.component.css']
})
export class DiagramLinesComponent {
  
  constructor(private engagementService: EngagementService,
    private userService: UserService,
    private schoolClassService: SchoolClassService) {}

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


}
