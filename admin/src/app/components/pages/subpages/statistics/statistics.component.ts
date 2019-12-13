import { Component, OnInit, AfterContentChecked } from '@angular/core';

declare function initChart();

declare function $(any);

import {Chart} from './../../../../../assets/js/vendor/Chart.min.js'
import { ProyectosService } from 'src/app/services/proyectos.service.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})


export class StatisticsComponent implements OnInit, AfterContentChecked {

  constructor(private proyectosservice: ProyectosService) { }

  ngOnInit() {

    this.proyectosservice.SolicitarEstadisticas()
      .then((estadisticas: any)=>{
        console.log(estadisticas);
        var data = {
          labels: ["Creado","Rec.requer", "Analisis", "Aprobados", "Planificados", "Especificados", "Desarrollados", "Vali.Int", "Val.Calidad", "Frabricada 1", "Val. 1"],
          datasets: [{
              label: '# of Projects',
              data: estadisticas,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
          
      };
        var options = {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          legend: {
              display: false
          },
          elements: {
              point: {
                  radius: 0
              }
          }
    
      };
    
      if ($("#barChart").length) {
        var barChartCanvas = $("#barChart").get(0).getContext("2d");
        // This will get the first returned node in the jQuery collection.
        var barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: data,
            options: options
        });
    }
    
      })
      .catch((err)=>{});

    // initChart();


  }

  ngAfterContentChecked () {
    
  }

}
