import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proyectoATestProbado'
})
export class ProyectoATestProbadoPipe implements PipeTransform {

  transform(proyecto: any, fase: string): string {
    switch(fase) {
      case '7':{
        return (proyecto.fase7.testProbado)?'SI':'NO';
      }break;
      case '8':{
        return (proyecto.fase8.testProbado)?'SI':'NO';
      }break;
    }
    return '';
  }

}
