import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proyectoAFecha'
})
export class ProyectoAFechaPipe implements PipeTransform {

  transform(proyecto: any, fase: string, tipo: string): String {
    let cadena: string = '';
    switch(fase) {
      case '0': {//creación
        if (tipo == 'creacion') {
          cadena = proyecto.fechaCreacion;
        }else if (tipo == 'prevista') {
          cadena = proyecto.fase0.fechaPrevista;
        }
      }break;
      case '1': {//creación
        if (tipo == 'creacion') {
          cadena = proyecto.fase1.fechaCreacion;
        }else if (tipo == 'prevista') {
          cadena = proyecto.fase1.fechaPrevista;
        }
      }break;
      case '2': {//creación
        if (tipo == 'creacion') {
          cadena = proyecto.fase2.fechaCreacion;
        }else if (tipo == 'prevista') {
          cadena = proyecto.fase2.fechaPrevista;
        }
      }break;
      case '3': {//creación
        if (tipo == 'creacion') {
          cadena = proyecto.fase3.fechaCreacion;
        }else if (tipo == 'prevista') {
          cadena = proyecto.fase3.fechaPrevista;
        }
      }break;
      case '4': {//creación
        if (tipo == 'creacion') {
          cadena = proyecto.fase4.fechaCreacion;
        }else if (tipo == 'prevista') {
          cadena = proyecto.fase4.fechaPrevista;
        }
      }break;
      case '5': {//creación
        if (tipo == 'creacion') {
          cadena = proyecto.fase5.fechaCreacion;
        }else if (tipo == 'prevista') {
          cadena = proyecto.fase5.fechaPrevista;
        }
      }break;
      case '6': {//creación
        if (tipo == 'creacion') {
          cadena = proyecto.fase6.fechaCreacion;
        }else if (tipo == 'prevista') {
          cadena = proyecto.fase6.fechaPrevista;
        }
      }break;
      case '7': {//creación
        if (tipo == 'creacion') {
          cadena = proyecto.fase7.fechaCreacion;
        }else if (tipo == 'prevista') {
          cadena = proyecto.fase7.fechaPrevista;
        }
      }break;
      case '8': {//creación
        if (tipo == 'creacion') {
          cadena = proyecto.fase8.fechaCreacion;
        }else if (tipo == 'prevista') {
          cadena = proyecto.fase8.fechaPrevista;
        }
      }break;
      case '9': {//creación
        if (tipo == 'creacion') {
          cadena = proyecto.fase9.fechaCreacion;
        }else if (tipo == 'prevista') {
          cadena = proyecto.fase9.fechaPrevista;
        }
      }break;
      case '10': {//creación
        if (tipo == 'creacion') {
          cadena = proyecto.fase10.fechaCreacion;
        }else if (tipo == 'prevista') {
          cadena = proyecto.fase10.fechaPrevista;
        }
      }break;
    }
    let fecha = new Date();
    fecha.setTime(Date.parse(cadena));
    const fechaOut: string = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
    return fechaOut;
  }

}
