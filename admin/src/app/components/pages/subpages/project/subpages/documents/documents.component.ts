import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { environment } from './../../../../../../../environments/environment';
import { SubidaFicherosService } from 'src/app/services/subida-ficheros.service';

interface tipoDocumento {
  titulo: string,
  nombre: string,
  version: string,
  rutaDescarga: string,
  tipoDoc: string,
  rutaHist: string
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styles: []
})
export class DocumentsComponent implements OnInit {

  rutaBackend: string = environment.ruta_backend;

  documentos: tipoDocumento[] = [];

  constructor(private proyectosservice: ProyectosService, private subidaficherosservice: SubidaFicherosService) {
    this.Calcular_documentos();
    }

    Calcular_documentos () {
      this.documentos = [];
      if (this.proyectosservice.proyectoActual.proyecto.documentoReq) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoReq, 'Requerimientos','req','REQUERIMIENTOS'));
        console.log(this.documentos);
       }
      if (this.proyectosservice.proyectoActual.proyecto.documentoEsp) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.documentoEsp, 'Especificaciones','esp','ESPECIFICACIONES'));
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
      if (this.proyectosservice.proyectoActual.proyecto.versionCambio) {
        this.documentos.push(this.Crear_documento(this.proyectosservice.proyectoActual.proyecto.versionCambio, 'Cambio','cambio','CAMBIO'));
        console.log(this.documentos);
       }
     }

    Crear_documento (doc: any, titulo: string, tipoDoc: string, pathRuta: string ): tipoDocumento {
      const documento: tipoDocumento = {
        titulo: titulo,
        nombre: doc.nombre,
        version: doc.version,
        rutaDescarga: `${this.rutaBackend}${doc.ruta}`,
        tipoDoc,
        rutaHist: `${this.rutaBackend}/documents/${this.proyectosservice.proyectoActual.proyecto._id}/${pathRuta}`
    
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
      })
      .catch(err=>console.log('Error:',err))


  }
}
