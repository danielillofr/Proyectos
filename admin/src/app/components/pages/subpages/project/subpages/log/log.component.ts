import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styles: []
})
export class LogComponent implements OnInit {

  constructor(private proyectosservice: ProyectosService) { }

  ngOnInit() {
  }

}
