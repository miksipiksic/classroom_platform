import { Component } from '@angular/core';
import { ChartOptions, LabelItem } from 'chart.js';
import { SchoolClassService } from '../services/school-class.service';
import { UserService } from '../services/user.service';
import { EngagementService } from '../services/engagement.service';

import Chart, { ChartDataset } from 'chart.js/auto';
@Component({
  selector: 'app-diagram-histogram',
  templateUrl: './diagram-histogram.component.html',
  styleUrls: ['./diagram-histogram.component.css']
})
export class DiagramHistogramComponent {
 
  constructor(private engagementService: EngagementService,
    private userService: UserService,
    private schoolClassService: SchoolClassService) {}

    chart: any;
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
          data: [this.daniRecnik[label]],
          label: label,
        }));
        let data = [...daniDataSet];

         this.chart = new Chart("MyChart", {
              type: 'bar', //this denotes tha type of chart
        
              data: {// values on X-Axis
                labels: [''],
                 datasets: data
              },
              options: {
                aspectRatio:2.5
              }
              
            });

      }
    )
  }





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

  kreirajRecnik(keys: string[], values: number[]): Record<string, number> {
    const recnik: Record<string, number> = {};

    keys.forEach((key, index) => {
        recnik[key] = values[index];
    });

    return recnik;
}





}
