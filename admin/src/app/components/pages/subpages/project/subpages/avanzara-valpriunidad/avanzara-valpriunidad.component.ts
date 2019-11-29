import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-avanzara-valpriunidad',
  templateUrl: './avanzara-valpriunidad.component.html',
  styles: []
})
export class AvanzaraValpriunidadComponent implements OnInit {

  formulario: FormGroup;

  constructor(private proyectosservice: ProyectosService, private router: Router) {
    this.formulario = new FormGroup({
      primeraUnidad: new FormControl('Si', [Validators.required]),
      comentarios: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
   }

  ngOnInit() {
  }

  Avanzar = () => {
    const datos = {
      primeraUnidad: (this.formulario.controls['primeraUnidad'].value == 'Si')?'true':'false',
      comentarios: this.formulario.controls['comentarios'].value
    }
    this.proyectosservice.Completar_val_unidad1(datos)
    .then((respuesta) => {
      this.router.navigate(['/pages','project', this.proyectosservice.proyectoActual.proyecto._id])
    })
    .catch((err)=>{
      console.log('Error:',err)
    })
      
  }  


}
