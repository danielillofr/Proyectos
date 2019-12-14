import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';

declare function initOffCanvas();
declare function initMisc();
declare function initDashboard();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'purple';
  cadena = 'block';

  constructor(public modalservice: ModalService){
  }

  ngOnInit() {
    initOffCanvas();
    initMisc();
    initDashboard();
  }

}
