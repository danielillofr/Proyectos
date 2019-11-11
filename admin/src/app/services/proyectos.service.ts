import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { UsuariosService } from './usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  env: String = environment.ruta_backend;

  constructor(private usuarioservice: UsuariosService, private http:HttpClient) { }
  Crear_proyecto(proyecto:any) {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.usuarioservice.token
      })
    };
    console.log(this.usuarioservice.token);
    console.log("Y ahora que");
    // return this.http.get(`http://localhost:3000/api/usuarios`, opciones);
    return this.http.post(`${this.env}/api/proyectos`, proyecto, opciones);
  }

  Obtener_proyectos () {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.usuarioservice.token
      })
    };
    console.log(this.usuarioservice.token);
    console.log("Y ahora que");
    // return this.http.get(`http://localhost:3000/api/usuarios`, opciones);
    return this.http.get(`${this.env}/api/proyectos/todos`, opciones);
  }
}
