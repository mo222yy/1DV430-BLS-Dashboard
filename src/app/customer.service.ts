import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {
  customers = []

  customersWithOpenOrders = []
  
  
  solsidan: Object[] = []
  dannes: Object[] = []
  bong: Object[] = []

  constructor() { }


  customerFillOrders(orderArray) {

    orderArray.forEach(el => {
      this.customers.forEach(customer => {
        //ÖPPNA + UTLANDS
        if(el.GoodsOwnerId[0] === customer.goodsOwnerID){
          customer.openOrders++
          if(el.CountryCode[0] !== "SE") {
            customer.abroadOrders++
          } 
          //RESTADE
          if(el.OrderPickability[0] !== "200" || el.OrderPickability[0] !== "300") {
            customer.restOrders++
          } 
          //ORDERLINES
          if( 'OrderLines' in el ) {
           el.OrderLines[0].BorjesDashBoardOrderLine.forEach(ol => {
             if(ol.DoPick[0] === 'true') {
               customer.orderLines++
             }
           })
          }
        }
      })
    });

    //FILTER LIST TO OPENORDERS AND SORT
    this.customersWithOpenOrders = this.customers.filter(el => el.openOrders > 0)
    this.customersWithOpenOrders.sort(function(a,b){
      return b.openOrders - a.openOrders
    })
  }



     
  Customer(goodsOwnerID, customerName, section, cutOff, contactName, phoneNumber, eMail, openOrders, abroadOrders, restOrders, orderLines)  {
    return {
      goodsOwnerID: goodsOwnerID,
      customerName: customerName,
      section: section,
      cutOff: cutOff,
      contactName: contactName,
      phoneNumber: phoneNumber,
      eMail: eMail,
      openOrders: openOrders,
      abroadOrders: abroadOrders,
      restOrders: restOrders,
      orderLines: orderLines
    }
  }

  CreateCustomers() { 
    let noll485 = this.Customer('162', '0485', 'Solsidan', '14.00', 'Jacob Westerlund', '070-644 77 76', 'jacob@wilsoncreative.se', 0 , 0 , 0 , 0)
    let Alsar = this.Customer('155', 'Alsar', 'Solsidan', '12.00', 'Shadi Hamsho', '+47 98413528', 'post@alsar.se', 0 , 0 , 0 , 0)
    let AnotherNext = this.Customer('145', 'Another Next', 'Solsidan', '14.00', 'Jonas Paulsson', '0704-826579', 'jonas@naforlag.se', 0 , 0 , 0 , 0 )
    let Arwin = this.Customer('126', 'Arwin', 'Solsidan', '15.00','Christian Arwin', '070-954 34 45', 'christian@arwin.se', 0 , 0 , 0 , 0)
    let BandaiNamco = this.Customer('147', 'BandaiNamco', 'Solsidan', '11.00', 'Hans Hedenskog', '076-856 65 88', 'hhedenskog@bandainamcoent.eu', 0 , 0 , 0 , 0)
    let BaraBallerina = this.Customer('134', 'BaraBallerina', 'Solsidan', '14.00', 'Jesper Loso', '+46 (0)703804524', 'info@lostromimport.se', 0 , 0 , 0 , 0)
    let BjornAxen = this.Customer('143', 'Björn Axén', 'Dannes', '14.00', 'Veronica Hammar', '073-536 87 10', 'Veronica.hammar@bjornaxen.se', 0 , 0 , 0 , 0 )
    let Civalero = this.Customer('135', 'Civalero', 'Solsidan', '13.00', 'Tobias Bengtsdahl', '070-0907 993', 'info@umbrothers.com', 0 , 0 , 0 , 0)
    let DonMarc = this.Customer('142', 'DonMarc', 'Solsidan', '14.00', 'Marcus Gardewik', '0034 656 39 33 17', 'quemola@gmail.com', 0 , 0 , 0 , 0)
    let Doorly = this.Customer('?', 'Doorly', 'Dannes', '10.00', 'Peter Ernstson', '0736 – 22 78 55', 'peter@doorly.se', 0 , 0 , 0 , 0) // flera alternativ, cutoff ?
    let Flattered = this.Customer('102', 'Flattered', 'Solsidan', '15.30', 'Gustav Lidén', '070-788 29 87', 'gustav@flattered.se', 0 , 0 , 0 , 0) // flera alternativ
    let GBernhard = this.Customer('?', 'G Bernhard', 'Solsidan', '14.00', 'Patrik Greitz', 'nA', 'patrik.greitz@gmail.com', 0 , 0 , 0 , 0) // inget telenummer
    let GarboFriends = this.Customer('104', 'Garbo & Friends', 'Solsidan', '14.00', 'Susann K Nemirovsky', '073-408 97 85', 'susann@garboandfriends.com', 0 , 0 , 0 , 0) // cutoff ?
    let GoteborgsFabriken = this.Customer('110', 'Göteborgsfabrikerna', 'Solsidan', '11.00', 'Magnus Tyren ', '070-842 95 50', 'Magnus.tyren@goteborgsfabrikerna.se', 0 , 0 , 0 , 0)
    let HandelsaktiebolagetSjöberg = this.Customer('177', 'Handelsaktiebolaget Sjöberg', 'Solsidan', 'dagen efter', 'Per Sjöberg', '0725-722589', 'per@absjoberg.se', 0 , 0 , 0 , 0)
    let Hargassner = this.Customer('127', 'Hargassner', 'Solsidan', '15.00', 'Marcus Nordin ', '0652-10451', 'marcus@hargassner.nu', 0 , 0 , 0 , 0)
    let Homeofdetails  = this.Customer('133', 'Home of details ', 'Solsidan', '14.30', 'Tobias Wärme', '+46 (0)70-244 57 34', 'tobias@homeofdetails.se', 0 , 0 , 0 , 0)
    let Isegarden = this.Customer('158', 'Isegarden', 'Solsidan', '13.00', 'Monika Lindström', '070-82 52 686', 'monika@isegarden.com', 0 , 0 , 0 , 0)
    let JDE = this.Customer('130', 'Jacobs Douwe Egberts', 'Solsidan', 'nA', 'Marcus Wallmoge', '072-141 25 18', 'Marcus.wallmoge@jdecoffee.com', 0 , 0 , 0 , 0)
    let JDIInvest = this.Customer('?', 'JDI Invest', 'Solsidan', 'nA', 'Håkan Hedin', '0730272560', 'hakan.hedin@gmail.com', 0 , 0 , 0 , 0)
    let Jolseko = this.Customer('131', 'Jolseko Juiceonline Scandinavia', 'Solsidan', '15.15', 'Anders Högman', '0735-342117', 'anders@juiceonline.se', 0 , 0 , 0 , 0) //fler alternativ
    let LEDenergyNordic = this.Customer('167', 'LEDenergy Nordic AB', '?', '12.00', 'Igal Yaffe', '070-799 60 63', 'info@ledenergy.se', 0 , 0 , 0 , 0)//avdelning?
    let LesBonnes = this.Customer('137', 'Les Bonnes', 'Solsidan', '14.30', 'Omar El-Barawany', 'nA', 'omar@labonne.se', 0 , 0 , 0 , 0)
    let LCC = this.Customer('103', 'Löwengrip Care & Color', 'Solsidan', '14.30', 'Ida Virdebrant', '070-572 72 14', 'ida@economista.se', 0 , 0 , 0 , 0)
    let MST = this.Customer('114', 'Min Systers Tehus', 'Solsidan', '14.30', 'Pernilla Halldin', '072-8536528', 'pernilla@minsysterstehus.com', 0 , 0 , 0 , 0)
    let Morjas = this.Customer('', 'Morjas', 'Solsidan', '13.00', 'Henrik Berg', '0734-179955', 'Henrik.berg@morjas.com', 0 , 0 , 0 , 0)
    let Multibrackets = this.Customer('119', 'Multibrackets Europe AB', 'Bong', '?', 'Sebastian Riddarstjärna', '?', '?', 0 , 0 , 0 , 0)
    let Nakaya = this.Customer('138', 'Nakaya', 'Solsidan', '14.00', 'Lasse Pahlberg', '076-80 86 888', 'lasse@nakaya.se', 0 , 0 , 0 , 0)
    let NavetSTHLM = this.Customer('150', 'Navet STHLM', 'Solsidan', '10.00', 'Cecilia Nadeschada Wahlberg', '?', 'navet@navetsthlm.com', 0 , 0 , 0 , 0)
    let NordenMachinery = this.Customer('', 'Norden Machinery', '?', '12.00', 'Magnus Petersson', '073-032 44 80', 'magnus.petersson@nordenmachinery.se', 0 , 0 , 0 , 0)
    let NordicHouseConstruction = this.Customer('146', 'Nordic House Consctruction AB', 'Dannes', '16.00', 'Rebecca B Pilgrim', '073-595 04 44', 'rebecca@nordic-house.se', 0 , 0 , 0 , 0)
    let Oblure = this.Customer('159', 'Oblure', 'Solsidan', '11.00', 'Erik Möller', '070-9406539', 'erik.moller@oblure.com', 0 , 0 , 0 , 0)
    let Pellicy = this.Customer('163', 'Pellicy', 'Solsidan', '14.00', 'nA', 'nA', 'nA', 0 , 0 , 0 , 0)
    let PouchPals = this.Customer('120', 'Pouch Pals', 'Solsidan', '14.00', 'Kristoffer Vural', '076-545 36 63', 'kristoffer@pouch-pals.com', 0 , 0 , 0 , 0)
    let ProstonLed = this.Customer('74', 'Proston LED', 'Solsidan','12.00', 'Micaela Svanberg', '0041-78 666 80 49', 'micaela.svanberg@rentaled.ch', 0 , 0 , 0 , 0)
    let Proston = this.Customer('76', 'Proston', 'Solsidan', '12.00', 'Fredrik Olson', '070-77 45 678', 'Fredrik.olson@proston.se', 0 , 0 , 0 , 0)
    let Rawnice = this.Customer('160', 'Rawnice', 'Solsidan', '12.00', 'Helene Arvidsson', '0763401533', 'jesper@rawnice.com', 0 , 0 , 0 , 0)
    let RRmöbler = this.Customer('125', 'RR Möbler', 'Solsidan', '15.00', 'Pontus Dau', '076-21 37 311', 'pontus@royalroom.se', 0 , 0 , 0 , 0)
    let Runelandhs = this.Customer('141', 'Runelandhs', 'Dannes', '12.00', 'Linda Johansson ', '0480-77 00 77', 'Linda.johansson@runelandhs.se', 0 , 0 , 0 , 0)
    let SaveMondays = this.Customer('170', 'SaveMondays', 'Solsidan', '13.00', 'Erik Karlberg', '+971 56-433 87 40', 'erik@savemondays.com', 0 , 0 , 0 , 0)
    let ScandDesignOnline = this.Customer('140', 'Scandinavian Design Online', 'Bong', '14.00', 'Anton Svensson', '0480 44 99 20. (alt 21)', 'anton.svensson@designonline.se', 0 , 0 , 0 , 0)
    let Selahatin = this.Customer('172', 'Selahatin', 'Solsidan', '13.00', 'Kristoffer Vural', '076-54 53 663', 'kristoffer@selahatin.com', 0 , 0 , 0 , 0)
    let theOccasionalRider = this.Customer('154', 'The Occasional Rider', 'Solsidan', '14.00', 'Mikael Fritz', '08-278996', 'mikael@occasionalrider.com', 0 , 0 , 0 , 0)
    let theOdeTo = this.Customer('?', 'The Ode To', 'Solsidan', '11.00', 'Anna Lukins', '+46 763 700 005', 'anna@theodeto.com', 0 , 0 , 0 , 0)
    let TLS = this.Customer('166', 'TLS Energimätning', 'Solsidan', '12.00', 'Hanna Filipsson', '073-808 03 83', 'Hanna.filipsson@tls.se', 0 , 0 , 0 , 0)
    let Tobakshop = this.Customer('116', 'Tobakshop', 'Solsidan', '14.30', 'Konstantin', '073-7693528', 'support@tobakshop.se', 0 , 0 , 0 , 0)
    let TTB = this.Customer('157', 'TTB Parts', 'Solsidan', '14.00', 'Mikael Sjöqvist', '072-965 76 41', 'mikael@ttbsweden.com', 0 , 0 , 0 , 0)
    let UnleashDerRotwild = this.Customer('98', 'UnleashDerRotwild', 'Solsidan', '14.30', 'Matthias Eliasius', '073-912 34 18', 'Prosperitas-invest@outlook.com', 0 , 0 , 0 , 0)
    let WattVeke = this.Customer('93', 'Watt & Veke', 'Dannes', '14.00', '?', '?', '?', 0 , 0 , 0 , 0)
    let Xylem = this.Customer('144', 'Xylem', 'Dannes', 'nA', 'Klas Nilsson', '0471-247036', 'Malin.eneberg@xyleminc.com', 0 , 0 , 0 , 0)
    let Youphoria = this.Customer('151', 'Youphoria', 'Solsidan', '14.00', 'Marcus Gardewik', '0034 656 39 33 17', 'quelola@gmail.com', 0 , 0 , 0 , 0)
    let Yourstuff = this.Customer('124', 'Yourstuff', 'Solsidan', '14.00', 'Tobias Seitamaa', '070-748 98 50', 'tobias@yourstuff.se', 0 , 0 , 0 , 0)
    let YourVanity = this.Customer('128', 'Your Vanity', 'Solsidan', '14.30', 'Andreas Dackefjord', '070-36 22 2 89', 'andreas@yvbusiness.se', 0 , 0 , 0 , 0)

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
     WattVeke,
     Xylem,
     Youphoria,
     Yourstuff,
     YourVanity
    )
  }

  

}
