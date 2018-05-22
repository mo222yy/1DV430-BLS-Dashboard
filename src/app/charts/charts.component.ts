import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import * as Chart from 'chart.js'
import * as d3 from 'd3';
import { pie } from 'd3';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})


export class ChartsComponent implements AfterContentInit {
  doughnutChart: any;


  constructor() {}

  ngAfterContentInit() {
    d3.select('p').style('color', 'red');

    let donutChartData = [{
      id: 0,
      label: 'water',
      value: 20,
      color: 'red',
    }, {
      id: 1,
      label: 'land',
      value: 20,
      color: 'blue',
    }, {
      id: 2,
      label: 'sand',
      value: 30,
      color: 'green',
    }, {
      id: 3,
      label: 'grass',
      value: 20,
      color: 'yellow',
    }, {
      id: 4,
      label: 'earth',
      value: 10,
      color: 'pink',
    }];
  }
}