import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ModalService } from '../../../../../services/modal.service';

declare function swal(titulo: String, mensaje: String ,tipo: String);

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit {

  idProjecto: String = null;
  constructor(private _activatedRoute: ActivatedRoute, public proyectosservice: ProyectosService, private router: Router,
              private modalservice: ModalService) {
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
          swal('Error','Error obteniendo el proyecto','error')
            .then(()=>{
              this.router.navigate(['/pages']);
            })
        })

    })

  }
}
