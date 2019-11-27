import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styles: []
})
export class DetailProjectComponent implements OnInit {

  idProyecto: String = '';

  constructor(private _router: ActivatedRoute, public proyectosservice: ProyectosService, private router:Router) { }

  ngOnInit() {
    this._router.parent.params.subscribe((params) => {
      this.idProyecto = params.idProyecto;
    })
  }

  avanzar = () => {
    let ruta = '';
    switch (Number(this.proyectosservice.proyectoActual.proyecto.fase)) {
      case 0:{
        ruta = 'avanzararecreq';
      }break;
      case 1:{
        ruta = 'avanzaraanalisis';
      }break;
      case 2:{
        ruta = 'avanzaraaprobacion';
      }break;
      case 3:{
        ruta = 'avanzaraplanificacion';
      }break;
      case 4:{
        ruta = 'avanzaraespecificaciones';
      }break;
      case 5:{
        ruta = 'avanzaradesarrollo';
      }break;
      case 6:{
        ruta = 'avanzaravalinterna';
      }break;
    }
    console.log('Ruta:', ruta)
    this.router.navigate(['/pages','project',this.idProyecto,ruta]);
  }
}
