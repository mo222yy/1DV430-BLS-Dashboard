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
    let bring = this.Transporter('Bring', '18.00', 'https://raw.githubusercontent.com/1dv430/mo222yy-project/master/src/app/transporterLogos/Bring.png?token=Ad3tHszP-ki1jJ2PIVvF_1HRBAn0QjHpks5a6vPPwA%3D%3D' )
    let schenker = this.Transporter('Schenker', '16.00', 'https://raw.githubusercontent.com/1dv430/mo222yy-project/master/src/app/transporterLogos/schenker.png?token=Ad3tHi8L2NumWj9hv3wqQ014dyhFpcEZks5a6vQTwA%3D%3D')
    let ups = this.Transporter('UPS', '14.00', 'https://raw.githubusercontent.com/1dv430/mo222yy-project/master/src/app/transporterLogos/ups.png?token=Ad3tHp4Chg8etij0wWq4tG4RW1zI7Uxlks5a6vSKwA%3D%3D')
    let dhl = this.Transporter('DHL', '12.00', 'https://raw.githubusercontent.com/1dv430/mo222yy-project/master/src/app/transporterLogos/dhl.png?token=Ad3tHrN8v2PTSUOQQmLYHivioRvrqOQIks5a8Sk8wA%3D%3D' )
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
}

 