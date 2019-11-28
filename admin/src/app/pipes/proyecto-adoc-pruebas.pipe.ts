import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proyectoADocPruebas'
})
export class ProyectoADocPruebasPipe implements PipeTransform {

  transform(proyecto: any, fase: string): string {
    switch (fase) {
      case '7':{
        return proyecto.versionPruInt;
      }break;
      case '8':{
        return proyecto.versionPruCal;
      }break;
    }
    return '';
  }

}
