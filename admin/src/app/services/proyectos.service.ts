import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { UsuariosService } from './usuarios.service';
import { datosHeader } from '../configs/config';


@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  env: String = environment.ruta_backend;

  proyectoActual: any;

  constructor(private usuarioservice: UsuariosService, private http:HttpClient) { }
  Crear_proyecto(proyecto:any) {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.usuarioservice.token
      })
    };
    // return this.http.get(`http://localhost:3000/api/usuarios`, opciones);
    return this.http.post(`${this.env}/api/proyectos`, proyecto, opciones);
  }

  Obtener_proyectos () {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.usuarioservice.token
      })
    };
    // return this.http.get(`http://localhost:3000/api/usuarios`, opciones);
    return this.http.get(`${this.env}/api/proyectos/todos`, opciones);
  }


  Obtener_proyecto = (idProyecto: String) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.usuarioservice.token
      })
    };
    return new Promise((resolve,reject) => {
      this.http.get(`${this.env}/api/proyectos/detalle/${idProyecto}`, opciones)
        .subscribe((respuesta) => {
          const datos:any = <any>respuesta;
          if (datos.ok === false) {
            reject();
          }else{
            this.proyectoActual = datos.proyecto;
            resolve();
          }
        }, (err)=>{
          reject();
        })
    })
  }
}
