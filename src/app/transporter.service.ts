import { Injectable } from '@angular/core';
import { TimeService } from './time.service'

@Injectable()
export class TransporterService {
 
  nextTransport = [] //object som ska visas


  constructor(private TimeService: TimeService) { }


  /**
   * Skapar transportör och skickar till transporters[]
   * @param name 
   * @param time 
   * @param logo 
   */
  Transporter(name, time, logo) {
    return({
      name: name,
      time: time,
      logo: logo
    })
  }


  getNextPickUp() {
    let bring = this.Transporter('Bring', 1800, 'https://raw.githubusercontent.com/1dv430/mo222yy-project/master/src/app/transporterLogos/Bring.png?token=Ad3tHouWvaf_O3mHFnvwgtX7OZs716Cbks5a4iYxwA%3D%3D' )
    let schenker = this.Transporter('Schenker', 1600, 'https://raw.githubusercontent.com/1dv430/mo222yy-project/master/src/app/transporterLogos/schenker.png?token=Ad3tHkNO96yzJdcp3B62nzo0RR9jZgKKks5a37B6wA%3D%3D')
    let ups = this.Transporter('UPS', 1400, 'https://raw.githubusercontent.com/1dv430/mo222yy-project/master/src/app/transporterLogos/ups.png?token=Ad3tHhvdjd2SUVK4XN8F2hSHejOA9BKOks5a36IKwA%3D%3D')
    let dhl = this.Transporter('DHL', 1200, 'https://raw.githubusercontent.com/1dv430/mo222yy-project/master/src/app/transporterLogos/dhl.png?token=Ad3tHulukBZrPuJzG0wtov-yHRPa-Calks5a4iX-wA%3D%3D' )
    //clear arrays
    this.nextTransport = []

    let currentTime = this.TimeService.getCurrentTime()
    
    if (currentTime <= 1200) {
      this.nextTransport.push(dhl)
      return this.nextTransport

    } else if(currentTime > 1200 || currentTime < 1400) {
      this.nextTransport = []
      this.nextTransport.push(ups)
      return this.nextTransport

    } else if(currentTime > 1400 || currentTime < 1600) {
      this.nextTransport = []
      this.nextTransport.push(schenker)
      return this.nextTransport

    } else if (currentTime > 1600 || currentTime < 1800) {
      this.nextTransport = []
      this.nextTransport.push(bring)
      return this.nextTransport


  }
}


 