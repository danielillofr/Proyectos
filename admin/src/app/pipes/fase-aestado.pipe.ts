import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'faseAEstado'
})
export class FaseAEstadoPipe implements PipeTransform {

  transform(fase: String): String {
    let cadena: String;
    const faseNum: number = Number(fase);
    switch (faseNum){
      case 0:{
        cadena = 'Creado';
      }break;
      case 1:{
        cadena = 'Requerido';
      }break;
      case 2:{
        cadena = 'Analizado';
      }break;
      case 3:{
        cadena = 'Aprobado';
      }break;
      case 4:{
        cadena = 'Planifiado';
      }break;
      case 5:{
        cadena = 'Especificado';
      }break;
      case 6:{
        cadena = 'Desarrollado';
      }break;
      case 7:{
        cadena = 'Validado Int';
      }break;
      case 8:{
        cadena = 'Validado Cal';
      }break;
      case 9:{
        cadena = 'Fabricada 1';
      }break;
      case 10:{
        cadena = 'Validada 1';
      }break;
    }
    return cadena;
  }

}
