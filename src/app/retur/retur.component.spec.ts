import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturComponent } from './retur.component';

describe('ReturComponent', () => {
  let component: ReturComponent;
  let fixture: ComponentFixture<ReturComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
