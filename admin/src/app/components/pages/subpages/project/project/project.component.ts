import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit {

  idProjecto: String = null;

  constructor(private _activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      console.log('Desde el component projecto:', params);
      this.idProjecto = params.idProyecto;
    })
  }

}
