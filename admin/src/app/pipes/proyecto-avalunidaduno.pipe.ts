import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proyectoAValunidaduno'
})
export class ProyectoAValunidadunoPipe implements PipeTransform {

  transform(proyecto: any): string {
    if (proyecto.fase10.primeraUnidad) {
      return 'Si';
    }else{
      return 'No';
    }
  }

}
