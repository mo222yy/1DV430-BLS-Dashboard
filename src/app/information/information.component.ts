import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  currentSection: string = 'Alla';
  
  messages = []
  messagesToShow = [] //array som ska visas

  header: string;
  message: string;
  section: string = 'all'; //om ingen section väljs - all as default


  all = []
  solsidan = []
  dannes = []
  bong = []


  constructor() { }

  ngOnInit() {
    this.getMessages()
    this.messagesToShow = this.messages //visar alla meddelanden onInit
    console.log(this.messages)
  }

  getHeader(event) {
    console.log(event.value)
    this.header = event.value
  }

  getMessage(event) {
    console.log(event.value)
    this.message = event.value 
  }

  getSection(event) {
    console.log(event)
    this.section = event
    }
  
  addMessage() {
    let message = this.createMessage(this.header, this.message, this.section)
    console.log('this.messages', this.messages)
  }
  
  createMessage(header, message, section) {
   this.messages.push({
    header: header,
    message: message,
    section: section
   })
   this.setMessages()
  } 

  //sätter meddelanden i localStorage
  setMessages() {
    localStorage.setItem("savedMessages", JSON.stringify(this.messages))
  }

  //hämtar meddelanden från localStorage
  getMessages() {
    let savedMessages = localStorage.getItem("savedMessages")
    let messages = JSON.parse(savedMessages)
    this.messages = messages
  }


  deleteMessage(event) {
    let count = 0
    this.messages.forEach(message => {
      if(message.header === event.header && message.message === event.message && message.section === event.section) {
        this.messages.splice(count, 1)
        console.log(message)
      }
      count++
    })
    this.setMessages()
  }


  selectedSection(section) {
  
    this.messagesToShow = [] //rensa listan
    console.log(this.messages)
    if(section === 'solsidan') {
     this.currentSection = 'Solsidan'
     this.messages.forEach(message => {
       if(message.section === 'solsidan') {
         this.messagesToShow.push(message)
       }
     })

   } else if (section === 'dannes') {
     this.currentSection = 'Dannes'
     this.messages.forEach(message => {
      if(message.section === 'dannes') {
        this.messagesToShow.push(message)
      }
    })

   } else if (section === 'bong') {
     this.currentSection = 'Bong'
     this.messages.forEach(message => {
      if(message.section === 'bong') {
        this.messagesToShow.push(message)
      }
    })

   } else if (section === 'all') {
     this.currentSection = 'Alla' 
     this.messages.forEach(message => {
      if(message.section === 'all') {
        this.messagesToShow.push(message)
      }
    }) 
   }
 }
}
