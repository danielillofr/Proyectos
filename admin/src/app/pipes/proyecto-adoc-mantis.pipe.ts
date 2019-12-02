import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proyectoADocMantis'
})
export class ProyectoADocMantisPipe implements PipeTransform {

  transform(proyecto: any, fase: string): string {
    switch (fase) {
      case '7':{
        return `${proyecto.documentoValInt.nombre} Versión ${proyecto.documentoValInt.version}`;
      }break;
      case '8':{
        return `${proyecto.documentoValCal.nombre} Versión ${proyecto.documentoValCal.version}`;
      }break;
    }
    return '';
  }

}
