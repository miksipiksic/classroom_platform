import { Component, Inject, Injectable, inject } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { UserService } from '../services/user.service';

import Chart from 'chart.js/auto';
import User from '../models/user';


@Component({
  selector: 'app-diagram-pie',
  templateUrl: './diagram-pie.component.html',
  styleUrls: ['./diagram-pie.component.css']
})
@Injectable({providedIn: 'root'})
export class DiagramPieComponent {


  constructor(private userService: UserService) {

  }

   config = {
    type: 'pie',
    data: null,
  };
nastavnici: User[] = [];
  ngOnInit() {


    this.userService.dohvatiNastavnike().subscribe(
      datas => {
        this.nastavnici = datas;
        this.nastavnici.filter((value)=> value.prihvacen !== 2);
        let zensko = "Ж";
        let musko = "М";
        for (let n of this.nastavnici) {
          if (n.pol == zensko) {
            this.recnikPolNastavnici[zensko] = this.recnikPolNastavnici[zensko] + 1;
          } else {
            this.recnikPolNastavnici[musko] = this.recnikPolNastavnici[musko] + 1;
          }
        }

        let dataNastavnici = Object.keys(this.recnikPolNastavnici).map(label => ({
          label: label,
          data: [this.recnikPolNastavnici[label]],
        }));

        this.chart1 = new Chart("MyChart", {
          type: 'pie', //this denotes tha type of chart
    
          data: {// values on X-Axis
            labels: ['Ж', 'М'],
             datasets: [{
              label: '',
              data: [this.recnikPolNastavnici["Ж"], this.recnikPolNastavnici["М"]],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
             }]
          },
          options: {
            aspectRatio:2.5
          }
          
        });
        ;


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
        let dataUcenici = Object.keys(this.recnikPolUcenici).map(label => ({
          label: label,
          data: [this.recnikPolUcenici[label]],
          backgroundColor: 'rgb(255, '
        }));

        let dataM = {
          label: "M",
          data: [this.recnikPolUcenici["M"]],
          backgroundColor: ['rgb(255, 99, 132)']
        }

        let dataZ = {
          label: "Ж",
          data: [this.recnikPolUcenici["Ж"]]
        }



        this.chart = new Chart("MyChart1", {
          type: 'pie', //this denotes tha type of chart
          
          data: {// values on X-Axis
            labels: ['Ж', 'М'],
             datasets: [{
              label: '',
              data: [this.recnikPolUcenici["Ж"], this.recnikPolUcenici["М"]],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
             }]
          },
          options: {
            aspectRatio:2.5,
           
          }
          
        });
      }
    )
  }
chart:any;
chart1: any;
  recnikPolNastavnici: {[key:string]: number} = {
    
    "М": 0,
    "Ж": 0
  }

  recnikPolUcenici: {[key:string]: number} = {
    
    "М": 0,
    "Ж": 0
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
