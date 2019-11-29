import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { UsuariosService } from './usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class LogsService {
  env: String = environment.ruta_backend;
  constructor(private usuarioservice: UsuariosService, private http:HttpClient) { }

  logs: any[] = [];

  Error_en_servicio(err: any) {
    console.log('Error en servicio de logs:', err)
  }

  Obtener_ultimos_logs () {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.usuarioservice.token
      })
    };
    return new Promise((resolve,reject) => {
       this.http.get(`${this.env}/api/logs`, opciones)
        .subscribe((datos: any)=>{
          if (datos.ok === false) {
            reject();
          }else{
            this.logs = datos.logs;
            resolve();
          }
        }, (err)=>{
          this.Error_en_servicio(err);
          reject();
        })          
      })

  }

}
