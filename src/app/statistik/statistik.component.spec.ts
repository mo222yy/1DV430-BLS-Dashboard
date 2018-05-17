import { async, ComponentFixture, TestBed ,inject} from '@angular/core/testing';

import { StatistikComponent } from './statistik.component';
import {MatMenuModule} from '@angular/material/menu';

xdescribe('StatistikComponent', () => {
  let component: StatistikComponent;
  let fixture: ComponentFixture<StatistikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatistikComponent ],
      imports: [MatMenuModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
