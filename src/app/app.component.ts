import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeService } from './time.service'

@Component({
  selector: 'app-root',
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
  setInterval(this.getTime(), 1000)
  }

  getDate() {
    this.TimeService.getDate()
    this.year = this.TimeService.year
    this.month = this.TimeService.month
    this.date = this.TimeService.date

  }

  getTime() {
    this.hours = this.TimeService.hours
    this.minutes = this.TimeService.minutes
    this.seconds = this.TimeService.seconds
  }
}
