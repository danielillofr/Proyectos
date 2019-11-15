import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-barra-fases',
  templateUrl: './barra-fases.component.html',
  styleUrls: ['./barra-fases.component.css']
})
export class BarraFasesComponent implements OnInit {

  @Input() idProyecto: String = '';

  numFase: Number;
  
  constructor(private proyectosservice: ProyectosService) { 
    this.numFase = Number(proyectosservice.proyectoActual.proyecto.fase);
   }

  ngOnInit() {
  }

}
