import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {
  year: string;
  month: string;
  date: string;

  hours: string;
  minutes: string;
  seconds: string;

  constructor() { }
  

  getDate() {
    let d = new Date()
    
    this.year = d.getFullYear().toString()
    
    let month = d.getMonth()
    this.month = this.get2digits(month)

    let date = d.getDate()
    this.date = this.get2digits(date)

    let hours = d.getHours()
    this.hours = this.get2digits(hours)

    let minutes = d.getMinutes()
    this.minutes = this.get2digits(minutes)

    let seconds = d.getSeconds()
    this.seconds = this.get2digits(seconds)
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

