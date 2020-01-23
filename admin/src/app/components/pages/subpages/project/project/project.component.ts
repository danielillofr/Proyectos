import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';


// declare function swal(titulo: String, mensaje: String ,tipo: String);

declare function swal(any);

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit {

  idProjecto: String = null;
  modalservice: any = {
    textoModal: '',
    mostrarModal: false
  }
  constructor(private _activatedRoute: ActivatedRoute, public proyectosservice: ProyectosService, private router: Router) {
   }

  ngOnInit() {
    this.proyectosservice.proyectoActual = null;
    this._activatedRoute.params.subscribe((params) => {
      this.idProjecto = params.idProyecto;
      this.modalservice.textoModal = 'Cargando proyecto...';
      this.modalservice.mostrarModal = true;
      this.proyectosservice.Obtener_proyecto(this.idProjecto)
        .then(()=>{
          this.modalservice.mostrarModal = false;
        })
        .catch((err)=>{
          this.modalservice.mostrarModal = false;
          console.log('Error:', err);
          swal({
            title: 'Error',
            text: `Error obteniendo proyecto`,
            icon: 'error',
            button: {
              text: 'Aceptar'
            }

          })
          .then(()=>{
              this.router.navigate(['/pages']);
            })
        })

    })

  }
  hola(){
    alert('Hola')
  }

  cambiarNombre(){
    swal({
      text: 'Nueva fecha prevista',
      content: 'input',
      button: {
        text: 'Aceptar'
      }
    })
    .then(nombre=>{
      this.proyectosservice.CambiarNombre(nombre)
        .then(respuesta=>{
          this.router.navigate(['/pages','project', this.proyectosservice.proyectoActual.proyecto._id])
        })
        .catch((err)=>{
          console.log(err);
          swal({
            title: 'Error',
            text: `Nombre cambiado correctamente ${nombre}`,
            icon: 'error',
            button: {
              text: 'Aceptar'
            }
          })
        })
      });
  }

  
}
