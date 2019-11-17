import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { UsuariosService } from './usuarios.service';
import { ProyectosService } from './proyectos.service';

@Injectable({
  providedIn: 'root'
})
export class SubidaFicherosService {

  constructor(private usuariosservice: UsuariosService, private proyectosservice: ProyectosService) { }

  subirDocumento = (fichero: File, idProyecto: String, fechaPrevista: string, fase: string) => {
    return new Promise((resolve,reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('archivo',fichero,fichero.name);
      formData.append('fechaPrevista',fechaPrevista);
      formData.append('fase', fase);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen ok');
            const respuesta: any = JSON.parse(xhr.response);
            this.proyectosservice.proyectoActual = respuesta.proyecto;
            resolve(respuesta);
          }else{
            console.log('Imagen mal');
            reject(xhr.response);
          }
        }
      }
      let url = `${environment.ruta_backend}/api/proyectos/completar/${idProyecto}`;
      xhr.open('PUT',url,true);
      xhr.setRequestHeader('Authorization', this.usuariosservice.token);
      xhr.send(formData);

    })
  }
}
