import { Injectable } from '@angular/core';
import { TimeService } from './time.service'

@Injectable()
export class TransporterService {
  transporters = [] // array med alla transportörer

  nextTransport = [] //object som ska visas

  currentDiff: number//jämför tider

  constructor(private TimeService: TimeService) { }


  /**
   * Skapar transportör och skickar till transporters[]
   * @param name 
   * @param time 
   * @param logo 
   */
  Transporter(name, time, logo) {
    this.transporters.push({
      name: name,
      time: time,
      logo: logo
    })
  }

  createTransporters(){
    this.Transporter('Schenker', 1400, 'https://raw.githubusercontent.com/1dv430/mo222yy-project/master/src/app/transporterLogos/schenker.png?token=Ad3tHkNO96yzJdcp3B62nzo0RR9jZgKKks5a37B6wA%3D%3D')
    this.Transporter('UPS', 1400, 'https://raw.githubusercontent.com/1dv430/mo222yy-project/master/src/app/transporterLogos/ups.png?token=Ad3tHhvdjd2SUVK4XN8F2hSHejOA9BKOks5a36IKwA%3D%3D')
  }


  getNextPickUp() {
    //clear arrays
    this.nextTransport = []
    this.transporters = []

    this.createTransporters()
    let currentTime = this.TimeService.getCurrentTime()

    this.currentDiff = 700

    this.transporters.forEach(el => {
      if(el.time - currentTime === this.currentDiff) {
        this.nextTransport.push(el)
      } else if (el.time - currentTime < this.currentDiff) {
        this.nextTransport = []
        this.nextTransport.push(el)
      }
    })
    return this.nextTransport
   }




}


 