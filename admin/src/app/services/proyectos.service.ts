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
      this.proyectoActual = await this.subidaficherosservice.completarFormulario(formData, this.proyectoActual.proyecto._id);
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
    return new Promise((resolve,reject) => {
      this.http.put(`${this.env}/api/proyectos/completar/${this.proyectoActual.proyecto._id}`, datos, opciones)
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
    return new Promise((resolve,reject) => {
      this.http.put(`${this.env}/api/proyectos/completar/${this.proyectoActual.proyecto._id}`, datos, opciones)
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

  Completar_especificaciones = async(docReq: File, fechaPrevista: string) => {
    try{
      let formData = new FormData();
      formData.append('docEsp',docReq,docReq.name);
      formData.append('fechaPrevista',fechaPrevista);
      formData.append('fase', '5');
      this.proyectoActual = await this.subidaficherosservice.completarFormulario(formData, this.proyectoActual.proyecto._id);
      return this.proyectoActual;
    }catch(err){
      throw new Error (err);
    }
  }

  Completar_desarrollo_conSOO = async(desarrollo:any,fechaPrevista: string, docSOO: File) => {
    let formData = new FormData();
    try{
      await this.Completar_desarrollo(desarrollo,fechaPrevista);
      formData.append('archivo',docSOO,docSOO.name);
      this.proyectoActual = await this.subidaficherosservice.subidaFichero(formData,this.proyectoActual.proyecto._id,'diseno');
      return this.proyectoActual;
    }catch(err){
      throw new Error (err);
    }
  }

  Completar_desarrollo = (desarrollo:any, fechaPrevista: string) => {
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.usuarioservice.token
      })
    };
    const datos = {
      fase: '6',
      fechaPrevista,
      desarrollo
    }
    return new Promise((resolve,reject) => {
      this.http.put(`${this.env}/api/proyectos/completar/${this.proyectoActual.proyecto._id}`, datos, opciones)
        .subscribe((datos: any) => {
          // const datos:any = <any>respuesta;
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

  Completar_validacion_interna = async(docPruebas: File,docManual: File,docMantis: File, fechaPrevista: string, testProbado: string) => {
    try{
      let formData = new FormData();
      formData.append('docPruebas',docPruebas,docPruebas.name);
      formData.append('docManual',docManual,docManual.name);
      formData.append('docMantis',docMantis,docMantis.name);
      formData.append('fechaPrevista',fechaPrevista);
      formData.append('fase', '7');
      formData.append('testProbado', testProbado);
      this.proyectoActual = await this.subidaficherosservice.completarFormulario(formData, this.proyectoActual.proyecto._id);
      return this.proyectoActual;
    }catch(err){
      throw new Error (err);
    }
  }

  Completar_validacion_calidad = async(docPruebas: File,docMantis: File, fechaPrevista: string, testProbado: string) => {
    try{
      let formData = new FormData();
      formData.append('docPruebas',docPruebas,docPruebas.name);
      formData.append('docMantis',docMantis,docMantis.name);
      formData.append('fechaPrevista',fechaPrevista);
      formData.append('fase', '8');
      formData.append('testProbado', testProbado);
      this.proyectoActual = await this.subidaficherosservice.completarFormulario(formData, this.proyectoActual.proyecto._id);
      return this.proyectoActual;
    }catch(err){
      throw new Error (err);
    }
  }

  Completar_fab_unidad1 = async(datos: any) => {
    datos.fase = '9';
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
            resolve();
          }
        }, (err)=>{
          reject();
        })
    })
  }
  Completar_val_unidad1 = async(datos: any) => {
    datos.fase = '10';
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
            resolve();
          }
        }, (err)=>{
          reject();
        })
    })
  }

  VolverAFase (fase: string, fechaPrevista: string) {
    let faseNum:number = Number(fase);
    faseNum = faseNum - 1;//Para volver a la fase anterior
    const datos:any = {
      fase: String(faseNum),
      fechaPrevista
    }
    const opciones = {
      headers: new HttpHeaders ({
        Authorization: this.usuarioservice.token
      })
    };
    return new Promise((resolve,reject)=>{
      this.http.put(`${this.env}/api/proyectos/${this.proyectoActual.proyecto._id}`, datos, opciones)
        .subscribe((respuesta) => {
          const datos:any = <any>respuesta;
          if (datos.ok === false) {
            console.log('Error:',datos);
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
