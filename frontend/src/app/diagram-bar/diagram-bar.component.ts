import { Component } from '@angular/core';
import { EngagementService } from '../services/engagement.service';
import { UserService } from '../services/user.service';
import { Engagement } from '../models/engagement';

import Chart, { ChartDataset } from 'chart.js/auto';

@Component({
  selector: 'app-diagram-bar',
  templateUrl: './diagram-bar.component.html',
  styleUrls: ['./diagram-bar.component.css']
})
export class DiagramBarComponent {

  private canvas: HTMLCanvasElement| undefined;
  private ctx: CanvasRenderingContext2D | undefined;

  constructor(private engagementService: EngagementService, private userService: UserService) {  }

  chart: any;

  ngOnInit() {

    this.engagementService.dohvatiAngazovanja().subscribe(
      data => {
        this.listaAngazovanja = data;
        for (let a of this.listaAngazovanja) {
          this.predmeti.push(a.predmet);
          this.brojNastavnikPredmeti.push(a.nastavnici.length);
        }
        this.predmetiRecnik = this.kreirajRecnik(this.predmeti, this.brojNastavnikPredmeti);

        this.userService.dohvatiNastavnike().subscribe(
          d => {
            for (let nastavnik of d) {
              for (let uzrast of nastavnik.uzrast) {
                for (let p in this.uzrastRecnik) {
                  if (p== uzrast) {
                    this.uzrastRecnik[p] = this.uzrastRecnik[p] + 1;
                  }
                }
              }
            }
            let predmetiLabels = Object.keys(this.predmetiRecnik);
            let uzrastLabels = Object.keys(this.uzrastRecnik);

            let predmetiDataSet = predmetiLabels.map(label => ({
              data: [this.predmetiRecnik[label]],
              label: label
            }))

            let uzrastDataSet = uzrastLabels.map(label => ({
              data: [this.uzrastRecnik[label]],
              label: label
            }))

            let data = [...predmetiDataSet, ...uzrastDataSet]

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
    )

  }

  

  // Chart configuration
 

  // Create the chart
  

  predmetiRecnik: { [key: string]: number } = {
  };

  uzrastRecnik: {[key:string]: number} = {
    "Основна школа 1-4. разред": 0,
    "Основна школа 5-8. разред": 0,
    "Средња школа": 0
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


   
/*

  constructor(private engagementService: EngagementService,
    private userService: UserService) {}

  ngOnInit() {

    this.engagementService.dohvatiAngazovanja().subscribe(
      data => {
        this.listaAngazovanja = data;
        for (let a of this.listaAngazovanja) {
          this.predmeti.push(a.predmet);
          this.brojNastavnikPredmeti.push(a.nastavnici.length);
        }
        this.predmetiRecnik = this.kreirajRecnik(this.predmeti, this.brojNastavnikPredmeti);

        this.userService.dohvatiNastavnike().subscribe(
          data => {
            for (let nastavnik of data) {
              for (let uzrast in nastavnik.uzrast) {
                for (let p in this.uzrastRecnik) {
                  if (p === uzrast) {
                    this.uzrastRecnik[p]= this.uzrastRecnik[p]+ 1;
                  }
              }
            }
            }

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
    //        this.barChartData =  [...predmetiDataSet, ...uzrastDataSet];
       //     this.createChart();
          }
        )


      }
    )


  }

  predmetiRecnik: { [key: string]: number } = {
  };

  uzrastRecnik: {[key:string]: number} = {
    "Основна школа 1-4. разред": 0,
    "Основна школа 5-8. разред": 0,
    "Средња школа": 0
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
barChartData :ChartDataset[] = [];

barChartOptions: ChartOptions = {
    responsive: true,
  };

  */
}
