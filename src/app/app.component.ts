import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeService } from './time.service'

import { ClockComponent } from './clock/clock.component'


@Component({
  selector: 'app-root',
  template: '<app-clock></app-clock',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.scss']
  
})
export class AppComponent  implements OnInit {
  title = 'app';
  
  year: string;
  month: string;
  date: string;

  hours: string;
  minutes: string;
  seconds: string;


  constructor(private TimeService: TimeService ) {}

  ngOnInit(): void {
  this.getDate()
  this.getTime()
}


  getDate() {
      this.TimeService.getDate()
      this.year = this.TimeService.year
      this.month = this.TimeService.month
      this.date = this.TimeService.date  
  }

  
  getTime() {
    let d = new Date()
    let hours = d.getHours()
    this.hours = this.TimeService.get2digits(hours)

    let minutes = d.getMinutes()
    this.minutes = this.TimeService.get2digits(minutes)

    let seconds = d.getSeconds()
    this.seconds = this.TimeService.get2digits(seconds)
  }
}
