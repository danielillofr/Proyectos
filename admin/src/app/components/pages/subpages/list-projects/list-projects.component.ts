import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Router } from '@angular/router';

declare function swal(titulo: String, mensaje: String ,tipo: String);

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styles: []
})
export class ListProjectsComponent implements OnInit {
  proyectos: any[] = null;
  constructor(private proyectosservice: ProyectosService, private router:Router) {
    proyectosservice.Obtener_proyectos()
      .subscribe((datos) => {
        const respuesta: any = datos;
        if (respuesta.ok === false) {
          swal('Error', 'Error obteniendo el listado de proyectos','error')
            .then(()=>{
              router.navigate(['/pages']);
            })
        }else{
          this.proyectos = respuesta.proyectos;
          console.log(this.proyectos);
        }
      },(err)=>{
        swal('Error', 'Error obteniendo el listado de proyectos','error')
        .then(()=>{
          router.navigate(['/pages']);
        })
      })
  }

  ngOnInit() {

  }

}
