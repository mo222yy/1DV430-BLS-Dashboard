import { Injectable } from '@angular/core';
import { getLocaleTimeFormat } from '@angular/common';
import { DatePipe } from '@angular/common';


@Injectable()
export class TimeService {
  year: string;
  month: string;
  date: string;

  hours: string;
  minutes: string; 
  seconds: string;

  currentTime: number; //ex. 1430

  playSection: string; //fuling för "bildspel"

  constructor() { }
  

  getDate() {
    let d = new Date()
    
    this.year = d.getFullYear().toString()
    
    let month = d.getMonth() + 1
    this.month = this.get2digits(month)

    let date = d.getDate()
    this.date = this.get2digits(date)

    let todaysDate = this.year + this.month + this.date
    return todaysDate
    
  }

    getTime() {
    let d = new Date()

    let hours = d.getHours()
    this.hours = this.get2digits(hours)

    let minutes = d.getMinutes()
    this.minutes = this.get2digits(minutes)

    let seconds = d.getSeconds()
    this.seconds = this.get2digits(seconds)

    let time = this.hours + this.minutes + this.seconds
    return time
  }

  getCurrentTime() {
    this.getTime()
    let currentTime = this.hours + this.minutes
    this.currentTime = parseInt(currentTime)

    return this.currentTime
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

