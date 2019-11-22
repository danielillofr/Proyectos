import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { UsuariosService } from './usuarios.service';
import { datosHeader } from '../configs/config';
import { SubidaFicherosService } from './subida-ficheros.service';


@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  env: String = environment.ruta_backend;

  proyectoActual: any;

  constructor(private usuarioservice: UsuariosService, private http:HttpClient, private subidaficherosservice: SubidaFicherosService) { }
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
            console.log(this.proyectoActual);
            resolve();
          }
        }, (err)=>{
          reject();
        })
    })
  }

  Completar_requerimientos = async(docReq: File, fechaPrevista: string) => {
    try{
      let formData = new FormData();
      formData.append('docReq',docReq,docReq.name);
      formData.append('fechaPrevista',fechaPrevista);
      formData.append('fase', '1');
      this.proyectoActual = await this.subidaficherosservice.subirDocumento(formData, this.proyectoActual.proyecto._id);
      console.log('Proyecto Actual:', this.proyectoActual);
      return this.proyectoActual;
    }catch(err){
      throw new Error (err);
    }
  }

  Completar_analisis = async(analisis:any, fechaPrevista: string) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.usuarioservice.token
      })
    };
    const datos = {
      fase: '2',
      fechaPrevista,
      analisis
    }
    console.log(datos);
    return new Promise((resolve,reject) => {
      this.http.put(`${this.env}/api/proyectos/completar/${this.proyectoActual.proyecto._id}`, datos, opciones)
        .subscribe((respuesta) => {
          const datos:any = <any>respuesta;
          if (datos.ok === false) {
            reject();
          }else{
            this.proyectoActual = datos.proyecto;
            console.log(this.proyectoActual);
            resolve();
          }
        }, (err)=>{
          reject();
        })
    })

  }

  Completar_aprobacion = async(datos: any) => {
    datos.fase = '3';
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.usuarioservice.token
      })
    };
    return new Promise((resolve,reject)=>{
      this.http.put(`${this.env}/api/proyectos/completar/${this.proyectoActual.proyecto._id}`, datos, opciones)
        .subscribe((respuesta) => {
          const datos:any = <any>respuesta;
          if (datos.ok === false) {
            reject();
          }else{
            this.proyectoActual = datos.proyecto;
            console.log(this.proyectoActual);
            resolve();
          }
        }, (err)=>{
          reject();
        })
    })
  }

  Completar_planificacion = async(planificacion:any, fechaPrevista: string) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.usuarioservice.token
      })
    };
    const datos = {
      fase: '4',
      fechaPrevista,
      planificacion
    }
    console.log(datos);
    return new Promise((resolve,reject) => {
      this.http.put(`${this.env}/api/proyectos/completar/${this.proyectoActual.proyecto._id}`, datos, opciones)
        .subscribe((respuesta) => {
          const datos:any = <any>respuesta;
          if (datos.ok === false) {
            reject();
          }else{
            this.proyectoActual = datos.proyecto;
            console.log(this.proyectoActual);
            resolve();
          }
        }, (err)=>{
          reject();
        })
    })

  }

  Completar_especificaciones = async(docReq: File, fechaPrevista: string) => {
    try{
      let formData = new FormData();
      formData.append('docEsp',docReq,docReq.name);
      formData.append('fechaPrevista',fechaPrevista);
      formData.append('fase', '5');
      this.proyectoActual = await this.subidaficherosservice.subirDocumento(formData, this.proyectoActual.proyecto._id);
      console.log('Proyecto Actual:', this.proyectoActual);
      return this.proyectoActual;
    }catch(err){
      throw new Error (err);
    }
  }


}
