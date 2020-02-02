import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'faseAFase'
})
export class FaseAFasePipe implements PipeTransform {

  transform(fase: String): String {
    let cadena: String;
    const faseNum: number = Number(fase);
    switch (faseNum){
      case 0:{
        cadena = 'Recopilando';
      }break;
      case 1:{
        cadena = 'Analizando';
      }break;
      case 2:{
        cadena = 'Aprobando';
      }break;
      case 3:{
        cadena = 'Planificando';
      }break;
      case 4:{
        cadena = 'Especificando';
      }break;
      case 5:{
        cadena = 'Desarrollando';
      }break;
      case 6:{
        cadena = 'Validando Int';
      }break;
      case 7:{
        cadena = 'Validando Cal';
      }break;
      case 8:{
        cadena = 'Fabricando 1ª';
      }break;
      case 9:{
        cadena = 'Validando 1ª';
      }break;
      case 10:{
        cadena = '--';
      }break;
    }
    return cadena;
  }

}
