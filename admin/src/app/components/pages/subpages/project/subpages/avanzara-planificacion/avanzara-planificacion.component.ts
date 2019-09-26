import { Component, OnInit, AfterContentChecked } from '@angular/core';

declare function $(any);

@Component({
  selector: 'app-avanzara-planificacion',
  templateUrl: './avanzara-planificacion.component.html',
  styles: []
})
export class AvanzaraPlanificacionComponent implements OnInit, AfterContentChecked {

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    var date_input=$('input[name="fecha"]'); //our date input has the name "date"
    var container="body";//$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    console.log(date_input);
    date_input.datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        container: container,
        todayHighlight: true,
        autoclose: true,
    })
    var date_input2=$('input[name="fechaInicio"]'); //our date input has the name "date"
    console.log(date_input);
    date_input2.datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        container: container,
        todayHighlight: true,
        autoclose: true,
    })
    var date_input3=$('input[name="fechaFin"]'); //our date input has the name "date"
    date_input3.datepicker({
      format: "dd/mm/yyyy",
      language: "es",
      container: container,
      todayHighlight: true,
      autoclose: true,
    })
  }

}
