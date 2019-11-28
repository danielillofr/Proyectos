import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as configFases from './../../../../../../../../configs/config';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { environment } from './../../../../../../../../../environments/environment'

@Component({
  selector: 'app-fase',
  templateUrl: './fase.component.html',
  styles: []
})
export class FaseComponent implements OnInit {

  idProyecto: String = '';

  fase: String = '';

  confFase: any = null;

  proyecto: any = null;

  numFase: Number = null;
  rutaBackend = environment.ruta_backend;

  constructor(private _activatedRoute: ActivatedRoute, public proyectosservice: ProyectosService) { 
    // this.proyecto = proyectosservice.proyectoActual;
    _activatedRoute.parent.parent.params.subscribe (params=>{
      this.idProyecto = params.idProyecto;
    })
    _activatedRoute.params
      .subscribe(params=>{
        this.fase = this.fase = params.fase;
        this.numFase = Number(this.fase);
        switch (this.fase) {
          case '0':{
            this.confFase = configFases.confFaseCreacion;
          }break;
          case '1':{
            this.confFase = configFases.confFaseRecopilacion;
          }break;
          case '2':{
            this.confFase = configFases.confFaseAnalisis;
          }break;
          case '3':{
            this.confFase = configFases.confFaseAprobacion;
          }break;
          case '4':{
            this.confFase = configFases.confFasePlanificacion;
          }break;
          case '5':{
            this.confFase = configFases.confFaseEspecificacion;
          }break;
          case '6':{
            this.confFase = configFases.confFaseDesarrollo;
          }break;
          case '7':{
            this.confFase = configFases.confFaseValidacionInterna;
          }break;
          case '8':{
            this.confFase = configFases.confFaseValidacionCalidad;
          }break;
          case '9':{
            this.confFase = configFases.confFaseFabPrimeraUnidad;
          }break;
          case '10':{
            this.confFase = configFases.confFaseValidacionPrimeraUnidad;
          }break;

        }
      })
  }

  ngOnInit() {
  }

  Doc_pruebas(){
    console.log(this.proyectosservice.proyectoActual.proyecto);
    if (this.fase == '7'){
      window.open(`${this.rutaBackend}/documents/${this.idProyecto}/PRUINT/${this.proyectosservice.proyectoActual.proyecto.versionPruInt}.pdf`, '_blank');
    }else if (this.fase == '8'){
      window.open(`${this.rutaBackend}/documents/${this.idProyecto}/PRUCAL/${this.proyectosservice.proyectoActual.proyecto.versionPruCal}.pdf`, '_blank');
    }
  }
  Doc_mantis(){
    console.log(this.proyectosservice.proyectoActual.proyecto);
    if (this.fase == '7'){
      window.open(`${this.rutaBackend}/documents/${this.idProyecto}/VALINT/${this.proyectosservice.proyectoActual.proyecto.versionPruInt}.pdf`, '_blank');
    }else if (this.fase == '8'){
      window.open(`${this.rutaBackend}/documents/${this.idProyecto}/VALCAL/${this.proyectosservice.proyectoActual.proyecto.versionPruCal}.pdf`, '_blank');
    }
  }
}
