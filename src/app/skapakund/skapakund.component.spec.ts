import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SkapakundComponent } from './skapakund.component';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import { CustomerService } from '../customer.service';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SkapakundComponent', () => {
  let component: SkapakundComponent;
  let fixture: ComponentFixture<SkapakundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatFormFieldModule,MatInputModule, BrowserAnimationsModule, MatRadioModule, MatListModule,RouterTestingModule],
      declarations: [ SkapakundComponent],
      providers: [CustomerService, SkapakundComponent],
    })
    
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkapakundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should inject CustomerService', inject([SkapakundComponent], (service: SkapakundComponent) => {
    expect(service).toBeTruthy();
  }))



});
