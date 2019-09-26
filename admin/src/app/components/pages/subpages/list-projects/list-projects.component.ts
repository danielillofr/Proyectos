import { Component, OnInit } from '@angular/core';

// declare function swal(any);

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styles: []
})
export class ListProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // swal({
    //   title: "Elemento creado",
    //   text: "Once deleted, you will not be able to recover this imaginary file!",
    //   icon: "error",
    //   buttons: {
    //     cancel: 'Cancelado',
    //     confirm: 'Aceptar'
    //   }
    //   // dangerMode: true,
    // })
    // .then((respuesta)=>{
    //   if (respuesta) {
    //     console.log('Ale, para delante')
    //   }
    // })
  }

}
