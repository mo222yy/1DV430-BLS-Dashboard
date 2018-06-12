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
  currentSection: string = 'Alla';
  

  all = []
  solsidan = []
  dannes = []
  bong = []

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
  }

  //MESSAGES 

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


  

  selectedSection(section) {
  }


}
