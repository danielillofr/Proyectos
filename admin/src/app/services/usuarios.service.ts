import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs';
import { TipoUsuario, RespuestaListaUsuarios, RespuestaTipoLogin } from './../interfaces/usuario.interface';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public token;
  public logueado: Boolean = false;
  public usuarioApp: TipoUsuario;

   //env: String = '';
    env: String = environment.ruta_backend;

  constructor(private http: HttpClient) { }

  solicitar_token (usuario: String, clave: String) {
    // return this.http.post('http://localhost:3000/api/usuarios/login', {nombre: usuario, clave});
    return this.http.post<RespuestaTipoLogin>(`${this.env}/api/usuarios/login`, {nombre: usuario, clave});
  }


}
