import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'faseABarra'
})
export class FaseABarraPipe implements PipeTransform {

  transform(fase: String): String {
    let valor: number = Number(fase);
    valor = (valor * 10);
    if (valor > 100) valor = 100;
    return String(valor);
  }

}
