import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  currentSection: string = 'Alla';
  
  messages = []
  messagesToShow = [] //array som ska visas

  toDo = []
  toDoToShow = []

  header: string;
  message: string;
  section: string = 'all'; //om ingen section väljs - all as default
  checked = false;

  headerTodo: string;
  messageTodo: string;
  sectionTodo: string;

  all = []
  solsidan = []
  dannes = []
  bong = []

  confirmed = []
  confirmName: string;


  constructor() { }

  ngOnInit() {
    this.setLocalStorage()
    this.getMessages()
    this.messagesToShow = this.messages //visar alla meddelanden onInit


    this.getToDos()
    this.toDoToShow = this.toDo
  }

  setLocalStorage() {
    if (localStorage.getItem('savedToDos') === null) {
      localStorage.setItem('savedToDos', JSON.stringify(this.toDo))
    }
  }

  //MESSAGES
  getHeader(event) {
    this.header = event.value
    console.log(this.header)
  }

  getMessage(event) {
    this.message = event.value 
    console.log(this.message)

  }

  getSection(event) {
    console.log(event)
    this.section = event
    }
  
  getConfirmation() {
    console.log(this.checked)
    if (this.checked === false) {
      this.checked = true
    } else if (this.checked === true){
      this.checked = false
     }
  }

  addMessage() {
    let message = this.createMessage(this.header, this.message, this.section, this.checked)
  }
  
  createMessage(header, message, section, confirmation) {
   this.messages.push({
    header: header,
    message: message,
    section: section,
    confirmation: this.checked
   })
   console.log(this.messages)
   this.setMessages()
  } 


  //sätter meddelanden i localStorage
  setMessages() {
    localStorage.setItem("savedMessages", JSON.stringify(this.messages))
    console.log('set.messages', this.messages)

  }

  //hämtar meddelanden från localStorage
  getMessages() {
    try {
    let savedMessages = localStorage.getItem("savedMessages")
    let messages = JSON.parse(savedMessages)
    this.messages = messages
    } catch(error) {
      console.log(error)
    }
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

  getConfirmName(name){
    this.confirmName = name.value;
    console.log(this.confirmName) 
  }

  confirm(message) {
    if (message.hasOwnProperty('confirmed')){
      message.confirmed.push(this.confirmName)
    } else {
      message.confirmed = []
      message.confirmed.push(this.confirmName)
    }
    this.setMessages()
    console.log(message)
  }

  addTodo(){
    let toDo = this.createToDo(this.headerTodo, this.messageTodo, this.sectionTodo)
    console.log('this.todo', this.toDo)
  }

  createToDo(header,message, section) {
    this.toDo.push({
      header: this.headerTodo,
      message: this.messageTodo,
      section: this.sectionTodo
    })
    this.setToDos()

  }

  // TODOS
  getHeaderTodo(event) {
    this.headerTodo = event.value
  }
  getMessageTodo(event) {
    this.messageTodo = event.value 
  }
  getSectionTodo(event) {
    this.sectionTodo = event
    }

    setToDos() {
      localStorage.setItem("savedToDos", JSON.stringify(this.toDo))
    }

    getToDos() {
      let savedToDos = localStorage.getItem("savedToDos")
      let toDo = JSON.parse(savedToDos)
      this.toDo = toDo

    }

    deleteToDos(event) {
      let count = 0
      this.toDo.forEach(todo => {
        if(todo.header === event.header && todo.message === event.message && todo.section === event.section) {
          this.toDo.splice(count, 1)
          console.log(todo)
        }
        count++
      })
      this.setToDos()
    }

  

  selectedSection(section) {
  
    this.messagesToShow = [] //rensa listan
    this.toDoToShow = []

    if(section === 'solsidan') {
     this.currentSection = 'Solsidan'
     this.messages.forEach(message => {
       if(message.section === 'solsidan') {
         this.messagesToShow.push(message)
       }
     })
     this.toDo.forEach(todo => {
       if(todo.section === 'solsidan') {
         this.toDoToShow.push(todo)
       }
     })

   } else if (section === 'dannes') {
     this.currentSection = 'Dannes'
     this.messages.forEach(message => {
      if(message.section === 'dannes') {
        this.messagesToShow.push(message)
      }
    })
    this.toDo.forEach(todo => {
      if(todo.section === 'dannes') {
        this.toDoToShow.push(todo)
      }
    })

   } else if (section === 'bong') {
     this.currentSection = 'Bong'
     this.messages.forEach(message => {
      if(message.section === 'bong') {
        this.messagesToShow.push(message)
      }
    })
    this.toDo.forEach(todo => {
      if(todo.section === 'bong') {
        this.toDoToShow.push(todo)
      }
    })

   } else if (section === 'all') {
     this.currentSection = 'Alla' 
     this.messages.forEach(message => {
      if(message.section === 'all') {
        this.messagesToShow.push(message)
      }
    }) 
    this.toDo.forEach(todo => {
      if(todo.section === 'all') {
        this.toDoToShow.push(todo)
      }
    })
   }
 }
}
