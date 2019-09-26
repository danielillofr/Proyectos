import { Component, OnInit, AfterContentChecked } from '@angular/core';

declare function initChart();

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})


export class StatisticsComponent implements OnInit, AfterContentChecked {

  constructor() { }

  ngOnInit() {
    initChart();
  }

  ngAfterContentChecked () {
    
  }

}
