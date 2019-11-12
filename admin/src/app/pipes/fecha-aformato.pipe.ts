import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaAFormato'
})
export class FechaAFormatoPipe implements PipeTransform {

  transform(fechaIn: string, args?: any): String {
    let fecha = new Date();
    fecha.setTime(Date.parse(fechaIn));
    const fechaOut: string = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
    return fechaOut;
  }

}
