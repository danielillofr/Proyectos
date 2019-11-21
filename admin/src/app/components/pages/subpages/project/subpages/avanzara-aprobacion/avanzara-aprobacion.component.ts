import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Router } from '@angular/router';
declare function $(any);

@Component({
  selector: 'app-avanzara-aprobacion',
  templateUrl: './avanzara-aprobacion.component.html',
  styles: []
})
export class AvanzaraAprobacionComponent implements OnInit, AfterContentChecked {

  formulario: FormGroup;

  constructor(private proyectosservice: ProyectosService, private router: Router) {
    this.formulario = new FormGroup({
      estadoAprobacion: new FormControl('Aprobado',[Validators.required]),
      motivo: new FormControl('', [Validators.required]),
      fechaPrevista: new FormControl('', [Validators.required])
    })
   }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    var date_input=$('input[name="fecha"]'); //our date input has the name "date"
    var container="body";//$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    this.formulario.controls['fechaPrevista'].setValue(date_input.val());
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

  Avanzar = () => {
    const datos = {
      fechaPrevista: this.Intercambiar_fecha(this.formulario.controls['fechaPrevista'].value),
      estadoAprobacion: (this.formulario.controls['estadoAprobacion'].value == 'Aprobado')?true:false,
      motivo: this.formulario.controls['motivo'].value
    }
    this.proyectosservice.Completar_aprobacion(datos)
    .then((respuesta) => {
      this.router.navigate(['/pages','project', this.proyectosservice.proyectoActual.proyecto._id])
    })
    .catch((err)=>{
      console.log('Error:',err)
    })
      
  }
}
