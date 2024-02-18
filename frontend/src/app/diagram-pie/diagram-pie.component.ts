import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-diagram-pie',
  templateUrl: './diagram-pie.component.html',
  styleUrls: ['./diagram-pie.component.css']
})
export class DiagramPieComponent {

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.dohvatiNastavnike().subscribe(
      data => {
        let zensko = "Ж";
        let musko = "М";
        for (let n of data) {
          if (n.pol == zensko) {
            this.recnikPolNastavnici[zensko] = this.recnikPolNastavnici[zensko] + 1;
          } else {
            this.recnikPolNastavnici[musko] = this.recnikPolNastavnici[musko] + 1;
          }
        }

        let dataNastavnici = Object.keys(this.recnikPolNastavnici).map(key => ({
          key: key,
          value: this.recnikPolNastavnici[key],
        }));

        this.datasets = {
          datasets: [{
            data: dataNastavnici,
            parsing: {
              xAxisKey: 'key',
              yAxisKey: 'value'
            }
          }],
        };

        
      }
    )

    this.userService.dohvatiUcenike().subscribe(
      data => {
        let zensko = "Ж";
        let musko = "М";
        for (let n of data) {
          if (n.pol == zensko) {
            this.recnikPolUcenici[zensko] = this.recnikPolUcenici[zensko] + 1;
          } else {
            this.recnikPolUcenici[musko] = this.recnikPolUcenici[musko] + 1;
          }
        }
        let dataUcenici = Object.keys(this.recnikPolUcenici).map(key => ({
          key: key,
          value: this.recnikPolUcenici[key],
        }));

        this.datasetsU = {
          datasets: [{
            data: dataUcenici,
            parsing: {
              xAxisKey: 'key',
              yAxisKey: 'value'
            }
          }],
        };
      }
    )
  }

  recnikPolNastavnici: {[key:string]: number} = {
    "Ж": 0,
    "М": 0
  }

  recnikPolUcenici: {[key:string]: number} = {
    "Ж": 0,
    "М": 0
  }

  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartOptions1: ChartOptions = {
    responsive: true,
  };
  
  datasets: ChartData <'pie', {key: string, value: number} []> = {
    datasets: [{
      data: [],
      parsing: {
        xAxisKey: 'key',
        yAxisKey: 'value'
      }
    }],
  };

  datasetsU: ChartData <'pie', {key: string, value: number} []> = {
    datasets: [{
      data: [],
      parsing: {
        xAxisKey: 'key',
        yAxisKey: 'value'
      }
    }],
  };
  
}
