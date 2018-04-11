import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkapakundComponent } from './skapakund.component';

describe('SkapakundComponent', () => {
  let component: SkapakundComponent;
  let fixture: ComponentFixture<SkapakundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkapakundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkapakundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
