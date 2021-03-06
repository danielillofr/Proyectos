import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as configFases from './../../../../../../../../configs/config';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { environment } from './../../../../../../../../../environments/environment'
import { UsuariosService } from 'src/app/services/usuarios.service';

declare function swal(any);

@Component({
  selector: 'app-fase',
  templateUrl: './fase.component.html',
  styles: []
})
export class FaseComponent implements OnInit {

  idProyecto: String = '';

  fase: string = '';

  confFase: any = null;

  proyecto: any = null;

  numFase: Number = null;
  rutaBackend = environment.ruta_backend;

  constructor(private _activatedRoute: ActivatedRoute, public proyectosservice: ProyectosService, private router:Router, public usuariosservice: UsuariosService) {
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
    if (this.fase == '7'){
      window.open(`${this.rutaBackend}${this.proyectosservice.proyectoActual.proyecto.documentoPruInt.ruta}`, '_blank');
    }else if (this.fase == '8'){
      window.open(`${this.rutaBackend}${this.proyectosservice.proyectoActual.proyecto.documentoPruCal.ruta}`, '_blank');
    }
  }
  Doc_mantis(){
    if (this.fase == '7'){
      window.open(`${this.rutaBackend}${this.proyectosservice.proyectoActual.proyecto.documentoValInt.ruta}`, '_blank');
    }else if (this.fase == '8'){
      window.open(`${this.rutaBackend}${this.proyectosservice.proyectoActual.proyecto.documentoValCal.ruta}`, '_blank');
    }
  }
  volverAFase(){
    swal({
      text: 'Nueva fecha prevista',
      content: 'input',
      button: {
        text: 'Aceptar'
      }
    })
    .then(fechaPrevista=>{
      this.proyectosservice.VolverAFase(this.fase, this.Intercambiar_fecha(fechaPrevista))
        .then(respuesta=>{
          this.router.navigate(['/pages','project', this.proyectosservice.proyectoActual.proyecto._id])
        })
        .catch((err)=>{
          console.log(err);
          swal({
            title: 'Error',
            text: `Error estableciendo la fecha ${fechaPrevista}`,
            icon: 'error',
            button: {
              text: 'Aceptar'
            }
          })
        })
      });
  }
  Intercambiar_fecha = (fechaEuropa: string) => {
    let b = fechaEuropa.split('/');
    let fechaBD: string = b[1] + '/' + b[0] + '/' + b[2];
    return fechaBD;
  }
  noFaseCreacion(){
    const faseNum: number = Number(this.fase);
    if (faseNum != 0) return true;
    return false;
  }
}
