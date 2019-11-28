import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Router } from '@angular/router';

declare function $(any);

@Component({
  selector: 'app-avanzara-fabpriunidad',
  templateUrl: './avanzara-fabpriunidad.component.html',
  styles: []
})
export class AvanzaraFabpriunidadComponent implements OnInit, AfterContentChecked {

  formulario: FormGroup;

  constructor(private proyectosservice: ProyectosService, private router: Router) {
    this.formulario = new FormGroup({
      primeraUnidad: new FormControl('', [Validators.required]),
      comentarios: new FormControl('', [Validators.minLength(3)]),
      fechaPrevista: new FormControl('01/01/2019', [Validators.required])
    })

    this.formulario.statusChanges.subscribe(vaalor=>console.log(vaalor));

  }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    var date_input=$('input[name="fecha"]'); //our date input has the name "date"
    this.formulario.controls['fechaPrevista'].setValue(date_input.val());
    var container="body";//$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    console.log(date_input);
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
      primeraUnidad: (this.formulario.controls['primeraUnidad'].value == 'Si')?'true':'false',
      comentarios: this.formulario.controls['comentarios'].value
    }
    this.proyectosservice.Completar_fab_unidad1(datos)
    .then((respuesta) => {
      this.router.navigate(['/pages','project', this.proyectosservice.proyectoActual.proyecto._id])
    })
    .catch((err)=>{
      console.log('Error:',err)
    })
      
  }  

}
