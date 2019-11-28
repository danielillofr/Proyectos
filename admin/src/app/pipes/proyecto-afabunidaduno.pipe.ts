import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proyectoAFabunidaduno'
})
export class ProyectoAFabunidadunoPipe implements PipeTransform {

  transform(proyecto: any): string {
    if (proyecto.fase9.primeraUnidad) {
      return 'Si';
    }else{
      return 'No';
    }
  }

}
