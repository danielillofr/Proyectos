import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';

declare function swal(any);

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
      case 7:{
        ruta = 'avanzaravalcalidad';
      }break;
      case 8:{
        ruta = 'avanzarafabpriunidad';
      }break;
      case 9:{
        ruta = 'avanzaravalpriunidad';
      }break;
    }
    this.router.navigate(['/pages','project',this.idProyecto,ruta]);
  }
  ProyectoNoFinalizado(){
    let faseNum: number = Number(this.proyectosservice.proyectoActual.proyecto.fase);
    return (faseNum != 10);
  }

  Intercambiar_fecha = (fechaEuropa: string) => {
    let b = fechaEuropa.split('/');
    let fechaBD: string = b[1] + '/' + b[0] + '/' + b[2];
    return fechaBD;
  }


  volverAFase(){
    swal({
      text: 'Nueva fecha prevista',
      content: 'input',
      buttons: {
          cancel: {
            text: "Cancel",
            value: null,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
      },
      // button: {
      //   text: 'Aceptar'
      // },
      showCancelButton: true
    })
    .then(fechaPrevista=>{
      if (fechaPrevista)
      {
        this.proyectosservice.VolverAFase(String(Number(this.proyectosservice.proyectoActual.proyecto.fase) + 1), this.Intercambiar_fecha(fechaPrevista))
          .then(respuesta=>{
            this.router.navigate(['/pages','project', this.proyectosservice.proyectoActual.proyecto._id])
          })
          .catch((err)=>{
            console.log(err);
            swal({
              title: 'Error',
              text: `Error estableciendo la fecha ${fechaPrevista}`,
              icon: 'error',
              button: {
                text: 'Aceptar'
              }
            })
          })

      }
      });
  }


}
