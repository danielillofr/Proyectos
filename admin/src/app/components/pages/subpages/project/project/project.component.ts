import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';

declare function swal(titulo: String, mensaje: String ,tipo: String);


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit {

  idProjecto: String = null;
  constructor(private _activatedRoute: ActivatedRoute, public proyectosservice: ProyectosService, private router: Router) {
    proyectosservice.proyectoActual = null;
    this._activatedRoute.params.subscribe((params) => {
      console.log('Desde el component projecto:', params);
      this.idProjecto = params.idProyecto;
      this.proyectosservice.Obtener_proyecto(this.idProjecto)
        .subscribe((datos)=>{
          const respuesta:any = datos;
          if (respuesta.ok === false)
          {
            console.log('Error:', respuesta.err);
            swal('Error','Error obteniendo el proyecto','error')
              .then(()=>{
                this.router.navigate(['/pages']);
              })
          }else{
            proyectosservice.proyectoActual = respuesta.proyecto;
            console.log(proyectosservice.proyectoActual);
          }
        },(err)=>{
          console.log('Error:', err);
          swal('Error','Error obteniendo el proyecto','error')
            .then(()=>{
              this.router.navigate(['/pages']);
            })
        })      
      
    })
   }
  
  ngOnInit() {

  }

}
