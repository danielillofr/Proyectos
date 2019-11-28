import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proyectoADocMantis'
})
export class ProyectoADocMantisPipe implements PipeTransform {

  transform(proyecto: any, fase: string): string {
    switch (fase) {
      case '7':{
        return proyecto.versionValInt;
      }break;
      case '8':{
        return proyecto.versionValCal;
      }break;
    }
    return '';
  }

}
