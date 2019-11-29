import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Router } from '@angular/router';

declare function $(any);

@Component({
  selector: 'app-avanzara-valcalidad',
  templateUrl: './avanzara-valcalidad.component.html',
  styles: []
})
export class AvanzaraValcalidadComponent implements OnInit, AfterContentChecked {

  ficPruebasSeleccionado: string = null;
  ficMantisSeleccionado: string = null;
  ficPru: File = null;
  ficMantis: File = null;

  formulario: FormGroup;


  constructor(private proyectosservice: ProyectosService, private router: Router) {
    this.formulario = new FormGroup({
      testProbado: new FormControl('Si', [Validators.required]),
      fechaPrevista: new FormControl('01/01/2019', [Validators.required])
    })

   }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    var date_input=$('input[name="fecha"]'); //our date input has the name "date"
    this.formulario.controls['fechaPrevista'].setValue(date_input.val());
    var container="body";//$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    date_input.datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        container: container,
        todayHighlight: true,
        autoclose: true,
    })
  }  

  Intercambiar_fecha = (fechaEuropa: string) => {
    let b = fechaEuropa.split('/');
    let fechaBD: string = b[1] + '/' + b[0] + '/' + b[2];
    return fechaBD;
  }   

  selecFicPruebas = (archivo) => {
    if (!archivo) return;
    this.ficPruebasSeleccionado = archivo.name;
    this.ficPru = archivo;
  }
  selecFicMantis = (archivo) => {
    if (!archivo) return;
    this.ficMantisSeleccionado = archivo.name;
    this.ficMantis = archivo;
  }
  avanzarFase = () => {
    this.proyectosservice.Completar_validacion_calidad(this.ficPru,this.ficMantis,this.Intercambiar_fecha(this.formulario.controls['fechaPrevista'].value),(this.formulario.controls['testProbado'].value==='Si')?'true':'false')
    .then((respuesta) => {
      this.router.navigate(['/pages','project', this.proyectosservice.proyectoActual.proyecto._id])
    })
    .catch((err)=>{
      console.log('Error:',err)
    })
    
  }
}
