import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class SubidaFicherosService {

  constructor(private usuariosservice: UsuariosService) { }

  subidaFichero = (formData: FormData, idProyecto: String, tipo: string) => {
    return new Promise((resolve,reject)=>{
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const respuesta: any = JSON.parse(xhr.response);
            if (respuesta.ok === false) {
              reject(respuesta.err);
            }else{
              resolve(respuesta.proyecto);
            }
          }else{
            reject(xhr.response);
          }
        }
      }
      let url = `${environment.ruta_backend}/api/upload${tipo}/${idProyecto}`;
      xhr.open('POST',url,true);
      xhr.setRequestHeader('Authorization', this.usuariosservice.token);
      xhr.send(formData);

    })
  }



  completarFormulario = (formData: FormData, idProyecto: String) => {
    return new Promise((resolve,reject)=>{
      // let formData = new FormData();
      let xhr = new XMLHttpRequest();
      // formData.append('archivo',fichero,fichero.name);
      // formData.append('fechaPrevista',fechaPrevista);
      // formData.append('fase', fase);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const respuesta: any = JSON.parse(xhr.response);
            if (respuesta.ok === false) {
              reject(respuesta.err);
            }else{
              resolve(respuesta.proyecto);
            }
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
