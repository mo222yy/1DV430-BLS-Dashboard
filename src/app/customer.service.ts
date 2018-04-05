import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {
  customers: Object[] = []

  customerOrderArray: Object[] = []
  solsidan: Object[] = []
  dannes: Object[] = []
  bong: Object[] = []

  constructor() { }
   
  Customer(goodsOwnerID, customerName, section, cutOff, contactName, phoneNumber, eMail) {
    return {
      goodsOwnerID: goodsOwnerID,
      name: name,
      section: section,
      cutOff: cutOff,
      contactName: contactName,
      phoneNumber: phoneNumber,
      eMail: eMail
    }
  }

  CreateCustomers() {
    //0485
    let noll485 = this.Customer('45', '0485', 'Solsidan', '14.00', 'Jacob Westerlund', '070-644 77 76', 'jacob@wilsoncreative.se')
    let Alsar = this.Customer('34', 'Alsar', 'Solsidan', '12.00', 'Shadi Hamsho', '+47 98413528', 'post@alsar.se')
    let AnotherNext = this.Customer('.', 'Another Next', 'Solsidan', '14.00', 'Jonas Paulsson', '0704-826579', 'jonas@naforlag.se'  )
    let Arwin = this.Customer('.', 'Arwin', 'Solsidan', '15.00','Christian Arwin', '070-954 34 45', 'christian@arwin.se')
    let BandaiNamco = this.Customer('.', 'BandaiNamco', 'Solsidan', '11.00', 'Hans Hedenskog', '076-856 65 88', 'hhedenskog@bandainamcoent.eu')
    let BaraBallerina = this.Customer('.', 'BaraBallerina', 'Solsidan', '14.00', 'Jesper Loso', '+46 (0)703804524', 'info@lostromimport.se')
    let BjornAxen = this.Customer('.', 'Björn Axén', 'Dannes', '14.00', 'Veronica Hammar', '073-536 87 10', 'Veronica.hammar@bjornaxen.se' )
    let Civalero = this.Customer('.', 'Civalero', 'Solsidan', '13.00', 'Tobias Bengtsdahl', '070-0907 993', 'info@umbrothers.com')
    let DonMarc = this.Customer('.', 'DonMarc', 'Solsidan', '14.00', 'Marcus Gardewik', '0034 656 39 33 17', 'quemola@gmail.com')
    let Doorly = this.Customer('.', 'Doorly', 'Dannes', '10.00', 'Peter Ernstson', '0736 – 22 78 55', 'peter@doorly.se') // flera alternativ, cutoff ?
    let Flattered = this.Customer('.', 'Flattered', 'Solsidan', '15.30', 'Gustav Lidén', '070-788 29 87', 'gustav@flattered.se') // flera alternativ
    let GBernhard = this.Customer('.', 'G Bernhard', 'Solsidan', '14.00', 'Patrik Greitz', 'nA', 'patrik.greitz@gmail.com') // inget telenummer
    let GarboFriends = this.Customer('.', 'Garbo & Friends', 'Solsidan', '14.00', 'Susann K Nemirovsky', '073-408 97 85', 'susann@garboandfriends.com') // cutoff ?
    let GoteborgsFabriken = this.Customer('.', 'Göteborgsfabrikerna', 'Solsidan', '11.00', 'Magnus Tyren ', '070-842 95 50', 'Magnus.tyren@goteborgsfabrikerna.se')
    let HandelsaktiebolagetSjöberg = this.Customer('.', 'Handelsaktiebolaget Sjöberg', 'Solsidan', 'dagen efter', 'Per Sjöberg', '0725-722589', 'per@absjoberg.se')
    let Hargassner = this.Customer('', 'Hargassner', 'Solsidan', '15.00', 'Marcus Nordin ', '0652-10451', 'marcus@hargassner.nu')
    let Homeofdetails  = this.Customer('', 'Home of details ', 'Solsidan', '14.30', 'Tobias Wärme', '+46 (0)70-244 57 34', 'tobias@homeofdetails.se')
    let Isegarden = this.Customer('', 'Isegarden', 'Solsidan', '13.00', 'Monika Lindström', '070-82 52 686', 'monika@isegarden.com')
    let JDE = this.Customer('', 'Jacobs Douwe Egberts', 'Solsidan', 'nA', 'Marcus Wallmoge', '072-141 25 18', 'Marcus.wallmoge@jdecoffee.com')
    let JDIInvest = this.Customer('', 'JDI Invest', 'Solsidan', 'nA', 'Håkan Hedin', '0730272560', 'hakan.hedin@gmail.com')
    let Jolseko = this.Customer('', 'Jolseko Juiceonline Scandinavia', 'Solsidan', '15.15', 'Anders Högman', '0735-342117', 'anders@juiceonline.se') //fler alternativ
    let LEDenergyNordic = this.Customer('', 'LEDenergy Nordic AB', '?', '12.00', 'Igal Yaffe', '070-799 60 63', 'info@ledenergy.se')//avdelning?
    let LesBonnes = this.Customer('', 'Les Bonnes', 'Solsidan', '14.30', 'Omar El-Barawany', 'nA', 'omar@labonne.se')
    let LCC = this.Customer('', 'Löwengrip Care & Color', 'Solsidan', '14.30', 'Ida Virdebrant', '070-572 72 14', 'ida@economista.se')
    let MST = this.Customer('', 'Min Systers Tehus', 'Solsidan', '14.30', 'Pernilla Halldin', '072-8536528', 'pernilla@minsysterstehus.com')
    let Morjas = this.Customer('', 'Morjas', 'Solsidan', '13.00', 'Henrik Berg', '0734-179955', 'Henrik.berg@morjas.com')
    let Multibrackets = this.Customer('', 'Multibrackets Europe AB', 'Bong', '?', 'Sebastian Riddarstjärna', '?', '?')
    let Nakaya = this.Customer('', 'Nakaya', 'Solsidan', '14.00', 'Lasse Pahlberg', '076-80 86 888', 'lasse@nakaya.se')
    let NavetSTHLM = this.Customer('', 'Navet STHLM', 'Solsidan', '10.00', 'Cecilia Nadeschada Wahlberg', '?', 'navet@navetsthlm.com')
    let NordenMachinery = this.Customer('', 'Norden Machinery', '?', '12.00', 'Magnus Petersson', '073-032 44 80', 'magnus.petersson@nordenmachinery.se')
    let NordicHouseConstruction = this.Customer('', 'Nordic House Consctruction AB', 'Dannes', '16.00', 'Rebecca B Pilgrim', '073-595 04 44', 'rebecca@nordic-house.se')
    let Oblure = this.Customer('', 'Oblure', 'Solsidan', '11.00', 'Erik Möller', '070-9406539', 'erik.moller@oblure.com')
    let Pellicy = this.Customer('', 'Pellicy', 'Solsidan', '14.00', 'nA', 'nA', 'nA')
    let PouchPals = this.Customer('', 'Pouch Pals', 'Solsidan', '14.00', 'Kristoffer Vural', '076-545 36 63', 'kristoffer@pouch-pals.com ')
    let ProstonLed = this.Customer('', 'Proston LED', 'Solsidan','12.00', 'Micaela Svanberg', '0041-78 666 80 49', 'micaela.svanberg@rentaled.ch')
    let Proston = this.Customer('', 'Proston', 'Solsidan', '12.00', 'Fredrik Olson', '070-77 45 678', 'Fredrik.olson@proston.se')
    let Rawnice = this.Customer('', 'Rawnice', 'Solsidan', '12.00', 'Helene Arvidsson', '0763401533', 'jesper@rawnice.com')
    let RRmöbler = this.Customer('', 'RR Möbler', 'Solsidan', '15.00', 'Pontus Dau', '076-21 37 311', 'pontus@royalroom.se')
    let Runelandhs = this.Customer('', 'Runelandhs', 'Dannes', '12.00', 'Linda Johansson ', '0480-77 00 77', 'Linda.johansson@runelandhs.se')
    let SaveMondays = this.Customer('', 'SaveMondays', 'Solsidan', '13.00', 'Erik Karlberg', '+971 56-433 87 40', 'erik@savemondays.com')
    let ScandDesignOnline = this.Customer('', 'Scandinavian Design Online', 'Bong', '14.00', 'Anton Svensson', '0480 44 99 20. (alt 21)', 'anton.svensson@designonline.se')
    let Selahatin = this.Customer('', 'Selahatin', 'Solsidan', '13.00', 'Kristoffer Vural', '076-54 53 663', 'kristoffer@selahatin.com')
    let theOccasionalRider = this.Customer('', 'The Occasional Rider', 'Solsidan', '14.00', 'Mikael Fritz', '08-278996', 'mikael@occasionalrider.com')
    let theOdeTo = this.Customer('', 'The Ode To', 'Solsidan', '11.00', 'Anna Lukins', '+46 763 700 005', 'anna@theodeto.com')
    let TLS = this.Customer('', 'TLS Energimätning', 'Solsidan', '12.00', 'Hanna Filipsson', '073-808 03 83', 'Hanna.filipsson@tls.se')
    let Tobakshop = this.Customer('', 'Tobakshop', 'Solsidan', '14.30', 'Konstantin', '073-7693528', 'support@tobakshop.se')
    let TTB = this.Customer('', 'TTB Parts', 'Solsidan', '14.00', 'Mikael Sjöqvist', '072-965 76 41', 'mikael@ttbsweden.com')
    let UnleashDerRotwild = this.Customer('', 'UnleashDerRotwild', 'Solsidan', '14.30', 'Matthias Eliasius', '073-912 34 18', 'Prosperitas-invest@outlook.com')
    let Xylem = this.Customer('', 'Xylem', 'Dannes', 'nA', 'Klas Nilsson', '0471-247036', 'Malin.eneberg@xyleminc.com')
    let Youphoria = this.Customer('', 'Youphoria', 'Solsidan', '14.00', 'Marcus Gardewik', '0034 656 39 33 17', 'quelola@gmail.com')
    let Yourstuff = this.Customer('', 'Yourstuff', 'Solsidan', '14.00', 'Tobias Seitamaa', '070-748 98 50', 'tobias@yourstuff.se')
    let YourVanity = this.Customer('', 'Your Vanity', 'Solsidan', '14.30', 'Andreas Dackefjord', '070-36 22 2 89', 'andreas@yvbusiness.se ')

    this.customers.push(
     noll485,
     Alsar,
     AnotherNext,
     Arwin,
     BandaiNamco,
     BaraBallerina,
     BjornAxen,
     Civalero,
     DonMarc,
     Doorly,
     Flattered,
     GBernhard,
     GarboFriends,
     GoteborgsFabriken,
     HandelsaktiebolagetSjöberg,
     Hargassner,
     Homeofdetails,
     Isegarden,
     JDE,
     JDIInvest,
     LEDenergyNordic,
     LesBonnes,
     LCC,
     MST,
     Morjas,
     Multibrackets,
     Nakaya,
     NavetSTHLM,
     NordenMachinery,
     NordicHouseConstruction,
     Oblure,
     Pellicy,
     PouchPals,
     ProstonLed,
     Proston,
     Rawnice,
     RRmöbler,
     Runelandhs,
     SaveMondays,
     ScandDesignOnline,
     Selahatin,
     theOccasionalRider,
     theOdeTo,
     TLS,
     Tobakshop,
     TTB,
     UnleashDerRotwild,
     Xylem,
     Youphoria,
     Yourstuff,
     YourVanity
    )
    console.log('customers', this.customers)

  }

}
