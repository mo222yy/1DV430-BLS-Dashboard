import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  year: string;
  month: string;
  date: string;

  hours: string;
  minutes: string; 
  seconds: string;

  //currentTime: number; //ex. 1430

  private dateVal: Date = new Date();
  private current = Date.now()

  constructor() { }

  ngOnInit() {
    //setInterval(this.getCurrentTime(), 1000)
    //this.getDate()
    this.currentTime()
  }

  currentTime() {
    let clock = setInterval ( () => {
      let d = new Date()

      let hours = d.getHours()
      this.hours = this.get2digits(hours)
  
      let minutes = d.getMinutes()
      this.minutes = this.get2digits(minutes)
  
      let seconds = d.getSeconds()
      this.seconds = this.get2digits(seconds)
      
    }, 1000)
  }

  getDate() {
    let d = new Date()
    
    this.year = d.getFullYear().toString()
    
    let month = d.getMonth() + 1
    this.month = this.get2digits(month)

    let date = d.getDate()
    this.date = this.get2digits(date)
  }

  get2digits(num) {
    if(num.toString().length < 2) {
      num = '0' + num
      return num
    } else {
    return num.toString()
  }
  }
   

}


