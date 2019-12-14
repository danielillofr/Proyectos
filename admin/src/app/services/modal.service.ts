import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  mostrarModal: boolean = false;
  textoModal: string = '';

  constructor() {

   }
}
