import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barra-fases',
  templateUrl: './barra-fases.component.html',
  styleUrls: ['./barra-fases.component.css']
})
export class BarraFasesComponent implements OnInit {

  @Input() idProyecto: String = '';



  constructor() {  }

  ngOnInit() {
  }

}
