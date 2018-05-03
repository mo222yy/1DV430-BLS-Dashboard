import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { TimeService } from './time.service'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        ClockComponent
      ],
      providers: [TimeService]
      
    }).compileComponents();
  }));

  it('should inject TimeService', inject([TimeService], (service: TimeService) => {
    expect(service).toBeTruthy();
  }))
 
});
