import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ClockComponent } from './clock.component';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockComponent ],
      providers: [ClockComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });
  it('should inject ClockComponent', inject([ClockComponent], (service: ClockComponent) => {
    expect(service).toBeTruthy();
  }))

  it('should return 2 digits', inject([ClockComponent], (service: ClockComponent) => {
    let test = service.get2digits(2)
    expect(test).toEqual('02')
  }))
});
