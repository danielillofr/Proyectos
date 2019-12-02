import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proyectoADocPruebas'
})
export class ProyectoADocPruebasPipe implements PipeTransform {

  transform(proyecto: any, fase: string): string {
    switch (fase) {
      case '7':{
        return `${proyecto.documentoPruInt.nombre} Versión ${proyecto.documentoPruInt.version}`;
      }break;
      case '8':{
        return `${proyecto.documentoPruCal.nombre} Versión ${proyecto.documentoPruCal.version}`;
      }break;
    }
    return '';
  }

}
