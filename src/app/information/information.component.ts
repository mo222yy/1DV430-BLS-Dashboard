import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  currentSection: string;


  messagesToShow = []
  toDoToShow = []

  messagesRef: AngularFireList<any>
  messages: Observable<any[]>;

  toDoRef: AngularFireList<any>
  toDos: Observable<any[]>;


  constructor(db: AngularFireDatabase) {
    this.messagesRef = db.list('messages')
    this.messages = this.messagesRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })) 
      )
    )

    this.toDoRef = db.list('todos')
    this.toDos = this.toDoRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })) 
      )
    )   }

  ngOnInit() {
    this.getMessages('Alla')
  }

  //MESSAGES 
  getMessages(section) {
    this.currentSection = section

    this.messages.subscribe(message => {
      this.messagesToShow = []
      message.forEach(m => {
        if (section === 'Alla') {
          this.messagesToShow.push(m)
        }
        if(m.section === section) {
          this.messagesToShow.push(m)
        }
      })
    })

    this.toDos.subscribe(todo => {
      this.toDoToShow = []
      todo.forEach(t => {
        if (section === 'Alla') {
          this.toDoToShow.push(t)
        }
        if(t.section === section) {
          this.toDoToShow.push(t)
        }
      })
    })
   
  }

  addMessage(value) {
    this.messagesRef.push(value);

  }

  deleteMessage(key: string) {
    this.messagesRef.remove(key)

  }

  //TODOS

  addTodo(value) {
    this.toDoRef.push(value)
  }
 
  deleteToDos(key: string) {
    this.toDoRef.remove(key)
  }
}
