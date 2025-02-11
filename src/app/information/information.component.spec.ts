import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InformationComponent } from './information.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';



describe('InformationComponent', () => {
  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule, MatMenuModule, MatCheckboxModule, MatInputModule, BrowserAnimationsModule, MatListModule, MatDividerModule, MatSelectModule, MatExpansionModule, MatFormFieldModule, FormsModule,],
      declarations: [ InformationComponent ],
      providers: [InformationComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', 
  inject([InformationComponent], (service: InformationComponent) => {
    expect(service).toBeTruthy();
  }))

  
  it('created message should be added to messages',
  inject([InformationComponent], (service: InformationComponent) => {
    let msg = service.createMessage('test', 'test', 'test', 'test')
    let msgs = service.messages
    expect(msgs.length).toBe(1)
  }))

  it('created message should be added to messages',
  inject([InformationComponent], (service: InformationComponent) => {
    let msg = service.createMessage('test', 'test', 'test', true)
    console.log('msg', msg)
    let delMsg = service.deleteMessage(msg)
    let msgs = service.messages
    expect(msgs.length).toBe(0)
  }))
  
  it('created todos should be added to todo',
  inject([InformationComponent], (service: InformationComponent) => {
    let todo = service.createToDo('test', 'test', 'test')
    let todos = service.toDo
    expect(todos.length).toBe(1)
  }))

  it('Todos should be deleted',
  inject([InformationComponent], (service: InformationComponent) => {
    let todo = service.createToDo('test', 'test', 'test')
    console.log('todo', todo)
    let todos = service.toDo
    let deleteTodo = service.deleteToDos(todo)
    expect(todos.length).toBe(0)

  }))

});