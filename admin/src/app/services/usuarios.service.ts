import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs';
import { TipoUsuario, RespuestaListaUsuarios, RespuestaTipoLogin,RespuestaCrearUsuario } from './../interfaces/usuario.interface';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public token;// ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTklTVFJBRE9SIiwiX2lkIjoiNWQ4Zjc3NzVjZGNmN2E0OWY0M2ZjZWNhIiwibm9tYnJlIjoiZGZlcm5hbmRleiIsIm5vbWJyZUNvbXBsZXRvIjoiRGFuaWVsIEZlcm7DoW5kZXoiLCJfX3YiOjB9LCJpYXQiOjE1NzM1MDk2MjQsImV4cCI6MTU3NjEwMTYyNH0.NIaJX1tdBLHGBEWwfnPFbmpdpjKOYHnk9gn4bLPymmU';
  public logueado: Boolean = false;
  public usuarioApp: TipoUsuario;

   //env: String = '';
    env: String = environment.ruta_backend;

  constructor(private http: HttpClient) { }

  solicitar_token (usuario: String, clave: String) {
    // return this.http.post('http://localhost:3000/api/usuarios/login', {nombre: usuario, clave});
    return this.http.post<RespuestaTipoLogin>(`${this.env}/api/usuarios/login`, {nombre: usuario, clave});
  }

  soliticar_usuarios() {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.token
      })
    };
    // return this.http.get(`http://localhost:3000/api/usuarios`, opciones);
    return this.http.get<RespuestaListaUsuarios>(`${this.env}/api/usuarios/todos`, opciones);

  }

  crearUsuario (usuario) {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.token
      })
    };
    return new Promise((resolve,reject) => {
      this.http.post<RespuestaCrearUsuario>(`${this.env}/api/usuarios`,usuario,opciones)
        .subscribe((respuesta: RespuestaCrearUsuario)=>{
          if (respuesta.ok==false) {
            reject ('No se ha podido crear usuario')
          }else{
            resolve(respuesta.usuarios);
          }
        },(err)=>{
           reject(err);  
        })
    })
  }

}
