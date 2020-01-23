import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { environment } from './../../../../../../../environments/environment';
import { SubidaFicherosService } from 'src/app/services/subida-ficheros.service';

declare function swal(titulo: String, mensaje: String ,tipo: String);

interface tipoDocumento {
  titulo: string,
  nombre: string,
  version: string,
  rutaDescarga: string,
  tipoDoc: string,
  rutaHist: string,
  existente: boolean
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styles: []
})
export class DocumentsComponent implements OnInit {

  rutaBackend: string = environment.ruta_backend;

  documentos: tipoDocumento[] = [];

  planificaciones: any[] = [];



  constructor(private proyectosservice: ProyectosService, private subidaficherosservice: SubidaFicherosService) {
      this.Calcular_documentos();
      proyectosservice.Solicitar_planificaciones(proyectosservice.proyectoActual.proyecto._id)
        .then((planificaciones: any[]) => {
          this.planificaciones = planificaciones;
          console.log('Planificaciones:', this.planificaciones);
        })
    }

    Calcular_documentos () {
      this.documentos = [];
      if (this.proyectosservice.proyectoActual.proyecto.documentoReq) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoReq, 'Requerimientos','req','REQUERIMIENTOS'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoEsp1) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoEsp1, 'Especificaciones','esp1','ESPECIFICACIONES1'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoEsp2) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoEsp2, 'Especificaciones 2','esp2','ESPECIFICACIONES2'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoEsp3) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoEsp3, 'Especificaciones 3','esp3','ESPECIFICACIONES3'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoEsp4) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoEsp4, 'Especificaciones 4','esp4','ESPECIFICACIONES4'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoValInt) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoValInt, 'Matins interno','valint','VALINT'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoPruInt) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoPruInt, 'Pruebas interno','pruint','PRUINT'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoManual) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoManual, 'Manual','manual','MANUAL'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoPruCal) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoPruCal, 'Pruebas calidad','prucal','PRUCAL'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoValCal) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoValCal, 'Mantis calidad','valcal','VALCAL'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoDiseno) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoDiseno, 'SOO','diseno','DISENO'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoDiseno2) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoDiseno2, 'SOO 2','diseno 2','DISENO2'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoDiseno3) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoDiseno3, 'SOO 3','diseno 3','DISENO3'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoDiseno4) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoDiseno4, 'SOO 4','diseno 4','DISENO4'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoCambio) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoCambio, 'Cambio','cambio','CAMBIO'));
        console.log(this.documentos);
       }else{
        this.documentos.push(this.Crear_documento(null, 'Cambio','cambio','CAMBIO'));
       }
     }

    Crear_documento (doc: any, titulo: string, tipoDoc: string, pathRuta: string): tipoDocumento {
      const documento: tipoDocumento = {
        titulo: titulo,
        nombre: (doc)?doc.nombre:'--',
        version: (doc)?doc.version:'--',
        rutaDescarga: (doc)?`${this.rutaBackend}${doc.ruta}`:'',
        tipoDoc,
        rutaHist: `${this.rutaBackend}/documents/${this.proyectosservice.proyectoActual.proyecto._id}/${pathRuta}`,
        existente: (doc)?true:false
      }
      return documento;
    }

  ngOnInit() {
  }

  selecDocum(archivo: File, tipo: string) {
    let formData = new FormData();
    console.log('ARchivo');
    if (!archivo) return;
    formData.append('archivo',archivo,archivo.name);
    this.subidaficherosservice.subidaFichero(formData,this.proyectosservice.proyectoActual.proyecto._id,tipo)
      .then(proyecto=>{
        this.proyectosservice.proyectoActual = proyecto;
        this.Calcular_documentos();
        swal('Documento subido',`${archivo.name} subido correctamente`,'success');
      })
      .catch(err=>console.log('Error:',err))


  }
}
