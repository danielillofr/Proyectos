import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Router } from '@angular/router';

declare function $(any);

interface TipoBloque {
  nombreBloque: string,
  rutaEsquematico: string,
  rutaPCB: string,
  rutaComponentes: string,
  rutaSoftware: string
}

@Component({
  selector: 'app-avanzara-desarrollo',
  templateUrl: './avanzara-desarrollo.component.html',
  styles: []
})
export class AvanzaraDesarrolloComponent implements OnInit {

  desarrollo: TipoBloque[] = new Array();
  formulario: FormGroup;
  formulario2: FormGroup;  
  ficheroSeleccionado: String = null;
  fichero: File = null;
  constructor(private proyectosservice: ProyectosService,private router: Router) {
    this.formulario = new FormGroup({
      nombreBloque: new FormControl('', [Validators.required]),
      rutaEsquematico: new FormControl('', [Validators.required]),
      rutaPCB: new FormControl('', [Validators.required]),
      rutaComponentes: new FormControl('', [Validators.required]),
      rutaSoftware: new FormControl('', [Validators.required])
    })
    this.formulario2 = new FormGroup({
      fechaPrevista: new FormControl('1/1/2019',[Validators.required])
    })
  }

  AnadirBloque = () => {
    let faseAnalisis: TipoBloque = {
      nombreBloque: this.formulario.controls['nombreBloque'].value,
      rutaEsquematico: this.formulario.controls['rutaEsquematico'].value,
      rutaPCB: this.formulario.controls['rutaPCB'].value,
      rutaComponentes: this.formulario.controls['rutaComponentes'].value,
      rutaSoftware: this.formulario.controls['rutaSoftware'].value
    }
    
    this.desarrollo.push(faseAnalisis);
    this.formulario.controls['nombreBloque'].setValue('');
    this.formulario.controls['rutaEsquematico'].setValue('');
    this.formulario.controls['rutaPCB'].setValue('');
    this.formulario.controls['rutaComponentes'].setValue('');
    this.formulario.controls['rutaSoftware'].setValue('');
    console.log(this.desarrollo);
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

  Avanzar = () =>{
    this.proyectosservice.Completar_desarrollo_conSOO(this.desarrollo, this.Intercambiar_fecha(this.formulario2.controls['fechaPrevista'].value), this.fichero)
    .then((respuesta) => {
      this.router.navigate(['/pages','project', this.proyectosservice.proyectoActual.proyecto._id])
    })
    .catch((err)=>{
      console.log('Error:',err)
    })
  }

  Eliminar = (i: number) => {
    this.desarrollo.splice(i,1);
  }
  selecDocum = (archivo) => {
    if (!archivo) return;
    this.ficheroSeleccionado = archivo.name;
    this.fichero = archivo;

  }  

}
