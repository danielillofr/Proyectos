import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Router } from '@angular/router';
declare function $(any);

interface TipoFaseAnalisis {
  fase: string,
  recursos: string,
  tiempo: string
}



@Component({
  selector: 'app-avanzara-analisis',
  templateUrl: './avanzara-analisis.component.html',
  styles: []
})
export class AvanzaraAnalisisComponent implements OnInit, AfterContentChecked {

  analisis: TipoFaseAnalisis[] = new  Array();
  formulario: FormGroup;
  formulario2: FormGroup;

  constructor(private proyectosservice: ProyectosService, private router: Router) {
    this.formulario = new FormGroup({
      fase: new FormControl('', [Validators.required]),
      recursos: new FormControl('', [Validators.required]),
      tiempo: new FormControl('', [Validators.required])
    })
    this.formulario2 = new FormGroup({
      fechaPrevista: new FormControl('01/01/2019',[Validators.required])
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
  }  

  Intercambiar_fecha = (fechaEuropa: string) => {
    let b = fechaEuropa.split('/');
    let fechaBD: string = b[1] + '/' + b[0] + '/' + b[2];
    return fechaBD;
  } 

  AnadirFase = () => {
    let faseAnalisis: TipoFaseAnalisis = {
      fase: this.formulario.controls['fase'].value,
      recursos: this.formulario.controls['recursos'].value,
      tiempo: this.formulario.controls['tiempo'].value
    }
    
    this.analisis.push(faseAnalisis);
    this.formulario.controls['fase'].setValue('');
    this.formulario.controls['recursos'].setValue('');
    this.formulario.controls['tiempo'].setValue('');
  }
  Avanzar = () =>{
    this.proyectosservice.Completar_analisis(this.analisis, this.Intercambiar_fecha(this.formulario2.controls['fechaPrevista'].value))
    .then((respuesta) => {
      this.router.navigate(['/pages','project', this.proyectosservice.proyectoActual.proyecto._id])
    })
    .catch((err)=>{
      console.log('Error:',err)
    })
  }
  Eliminar = (i: number) => {
    this.analisis.splice(i,1);
  }
}
