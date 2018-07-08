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

  //https://github.com/1dv430/mo222yy-project/blob/master/src/app/transporterLogos/dhl.png?raw=true
  getNextPickUp() {
    let bring = this.Transporter('Bring', '18.00', 'https://github.com/1dv430/mo222yy-project/blob/master/src/app/transporterLogos/Bring.png?raw=true' )
    let schenker = this.Transporter('Schenker', '16.00', 'https://github.com/1dv430/mo222yy-project/blob/master/src/app/transporterLogos/schenker.png?raw=true')
    let ups = this.Transporter('UPS', '14.00', 'https://github.com/1dv430/mo222yy-project/blob/master/src/app/transporterLogos/ups.png?raw=true')
    let dhl = this.Transporter('DHL', '13.00', 'https://github.com/1dv430/mo222yy-project/blob/master/src/app/transporterLogos/dhl.png?raw=true' )
    let postnord = this.Transporter('postNord', '15.30', 'https://github.com/1dv430/mo222yy-project/blob/master/src/images/postnord2.png?raw=true')
    //clear arrays
    this.nextTransport = []

    let currentTime = this.TimeService.getCurrentTime()
    if (currentTime <= 1200) {
      this.nextTransport.push(dhl)
      return this.nextTransport

    } else if(currentTime > 1200 && currentTime < 1400) {
      this.nextTransport = []
      this.nextTransport.push(ups)
      return this.nextTransport

    } else if (currentTime > 1400 && currentTime < 1530) {
      this.nextTransport = []
      this.nextTransport.push(postnord)
      return this.nextTransport

    } else if(currentTime > 1530 && currentTime < 1600) {
      this.nextTransport = []
      this.nextTransport.push(schenker)
      return this.nextTransport

    } else if (currentTime > 1600 && currentTime < 1800) {
      this.nextTransport = []
      this.nextTransport.push(bring)
      return this.nextTransport
    
    } else {
      this.nextTransport.push(dhl)
      return this.nextTransport
    }


}
}

 