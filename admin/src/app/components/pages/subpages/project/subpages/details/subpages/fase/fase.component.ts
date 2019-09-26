import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as configFases from './../../../../../../../../configs/config';


@Component({
  selector: 'app-fase',
  templateUrl: './fase.component.html',
  styles: []
})
export class FaseComponent implements OnInit {

  idProyecto: String = '';

  fase: String = '';

  confFase: any = null;

  constructor(private _activatedRoute: ActivatedRoute) { 
    _activatedRoute.parent.parent.params.subscribe (params=>{
      this.idProyecto = params.idProyecto;
    })
    _activatedRoute.params
      .subscribe(params=>{
        this.fase = this.fase = params.fase;
        switch (this.fase) {
          case '1':{
            this.confFase = configFases.confFaseCreacion;
          }break;
          case '2':{
            this.confFase = configFases.confFaseRecopilacion;
          }break;
          case '3':{
            this.confFase = configFases.confFaseAnalisis;
          }break;
          case '4':{
            this.confFase = configFases.confFaseAprobacion;
          }break;
          case '5':{
            this.confFase = configFases.confFasePlanificacion;
          }break;
          case '6':{
            this.confFase = configFases.confFaseEspecificacion;
          }break;
          case '7':{
            this.confFase = configFases.confFaseDesarrollo;
          }break;
          case '8':{
            this.confFase = configFases.confFaseValidacionInterna;
          }break;
          case '9':{
            this.confFase = configFases.confFaseValidacionCalidad;
          }break;
          case '10':{
            this.confFase = configFases.confFaseFabPrimeraUnidad;
          }break;
          case '11':{
            this.confFase = configFases.confFaseValidacionPrimeraUnidad;
          }break;

        }
      })
  }

  ngOnInit() {
  }

}
