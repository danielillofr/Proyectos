import { Component, OnInit } from '@angular/core';

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

  constructor(){
  }

  ngOnInit() {
    initOffCanvas();
    initMisc();
    initDashboard();
  }

}
