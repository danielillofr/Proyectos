import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Router } from '@angular/router';

declare function $(any);

interface TipoFasePlanificacion {
  fase: string,
  fechaInicio: string,
  fechaFin: string
}

@Component({
  selector: 'app-avanzara-planificacion',
  templateUrl: './avanzara-planificacion.component.html',
  styles: []
})
export class AvanzaraPlanificacionComponent implements OnInit, AfterContentChecked {

  planificacion: TipoFasePlanificacion[] = new  Array();
  formulario: FormGroup;
  formulario2: FormGroup;  
  constructor(private proyectosservice: ProyectosService, private router: Router) {
    let actualizacion: boolean = ((Number(proyectosservice.proyectoActual.proyecto.fase)) > 3);
    if (actualizacion) {

      this.planificacion = proyectosservice.proyectoActual.proyecto.fase4.planificacion;

      for (let i = 0; i < this.planificacion.length; i++){
        let fecha = new Date();
        fecha.setTime(Date.parse(this.planificacion[i].fechaInicio));
        this.planificacion[i].fechaInicio = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
        fecha.setTime(Date.parse(this.planificacion[i].fechaFin));
        this.planificacion[i].fechaFin = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
      }
    }
    this.formulario = new FormGroup({
      fase: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFin: new FormControl('', [Validators.required])
    })
    this.formulario2 = new FormGroup({
      fechaPrevista: new FormControl((actualizacion)?(proyectosservice.proyectoActual.proyecto.fase4.fechaPrevista):('01/01/2019'),[Validators.required])
    })    
   }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    var date_input=$('input[name="fecha"]'); //our date input has the name "date"
    this.formulario2.controls['fechaPrevista'].setValue(date_input.val());
    var container="body";//$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    date_input.datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        container: container,
        todayHighlight: true,
        autoclose: true,
    })
    var date_input2=$('input[name="fechaInicio"]'); //our date input has the name "date"
    this.formulario.controls['fechaInicio'].setValue(date_input2.val());
    date_input2.datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        container: container,
        todayHighlight: true,
        autoclose: true,
    })
    var date_input3=$('input[name="fechaFin"]'); //our date input has the name "date"
    this.formulario.controls['fechaFin'].setValue(date_input3.val());
    date_input3.datepicker({
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

  AnadirFase = () => {
    let faseAnalisis: TipoFasePlanificacion = {
      fase: this.formulario.controls['fase'].value,
      fechaInicio: this.formulario.controls['fechaInicio'].value,
      fechaFin: this.formulario.controls['fechaFin'].value
    }
    
    this.planificacion.push(faseAnalisis);
    this.formulario.controls['fase'].setValue('');
    this.formulario.controls['fechaInicio'].setValue('');
    this.formulario.controls['fechaFin'].setValue('');
  }

  Avanzar = () =>{
    let datos = this.planificacion;
    for (let i = 0; i < datos.length; i++) {
      datos[i].fechaInicio = this.Intercambiar_fecha(datos[i].fechaInicio);
      datos[i].fechaFin = this.Intercambiar_fecha(datos[i].fechaFin);
    }
    this.proyectosservice.Completar_planificacion(this.planificacion, this.Intercambiar_fecha(this.formulario2.controls['fechaPrevista'].value))
    .then((respuesta) => {
      this.router.navigate(['/pages','project', this.proyectosservice.proyectoActual.proyecto._id])
    })
    .catch((err)=>{
      console.log('Error:',err)
    })
  }

  Eliminar = (i: number) => {
    this.planificacion.splice(i,1);
  }

}
