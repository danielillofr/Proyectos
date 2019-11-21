import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoAprobacion'
})
export class EstadoAprobacionPipe implements PipeTransform {

  transform(aprobado: boolean): string {
    if (aprobado){
      return 'Aprobado';
    }else{
      return 'Cancelado'
    }
  }

}
