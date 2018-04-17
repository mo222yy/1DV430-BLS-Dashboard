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
    this.Transporter('Schenker', 1600, './transporterLogos/schenker.gif')
    this.Transporter('UPS', 1400, './transporterLogos/ups.png')
  }


  getNextPickUp() {
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


 