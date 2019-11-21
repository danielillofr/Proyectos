import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { SubidaFicherosService } from './../../../../../../services/subida-ficheros.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare function $(any);

@Component({
  selector: 'app-avanzara-rec-req',
  templateUrl: './avanzara-rec-req.component.html',
  styles: []
})
export class AvanzaraRecReqComponent implements OnInit, AfterContentChecked {

  formulario: FormGroup;
  ficheroSeleccionado: String = null;
  fichero: File = null;

  constructor(private subidaficherosservice: SubidaFicherosService, private proyectosservice: ProyectosService,
              private router: Router) { 
    this.formulario = new FormGroup({
      fechaPrevista : new FormControl('01/01/2019', [Validators.required])
    })
  }

  ngOnInit() {
  }
  
  Intercambiar_fecha = (fechaEuropa: string) => {
    let b = fechaEuropa.split('/');
    let fechaBD: string = b[1] + '/' + b[0] + '/' + b[2];
    return fechaBD;
  }  

  ngAfterContentChecked() {
    var date_input=$('input[name="fecha"]'); //our date input has the name "date"
    this.formulario.controls['fechaPrevista'].setValue(date_input.val());
    var container="body";//$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    // console.log(date_input);
    date_input.datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        container: container,
        todayHighlight: true,
        autoclose: true,
    })
  }

  avanzarFase = () => {
    // this.subidaficherosservice.subirDocumento(this.fichero,this.proyectosservice.proyectoActual.proyecto._id,this.Intercambiar_fecha(this.formulario.controls['fechaPrevista'].value),'1')
    //   .then((respuesta) => {
    //     console.log(respuesta);
    //     console.log(this.proyectosservice.proyectoActual);
    //     this.router.navigate(['/pages','project', this.proyectosservice.proyectoActual.proyecto._id])
    //   })
    //   .catch((err)=>{
    //     console.log('Error:',err)
    //   })
    this.proyectosservice.Completar_requerimientos(this.fichero,this.Intercambiar_fecha(this.formulario.controls['fechaPrevista'].value))
      .then((respuesta) => {
        this.router.navigate(['/pages','project', this.proyectosservice.proyectoActual.proyecto._id])
      })
      .catch((err)=>{
        console.log('Error:',err)
      })
      
  }

  selecDocum = (archivo) => {
    console.log('Fichero:',archivo);
    if (!archivo) return;
    this.ficheroSeleccionado = archivo.name;
    this.fichero = archivo;

  }


}
