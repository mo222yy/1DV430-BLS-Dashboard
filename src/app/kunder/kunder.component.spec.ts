import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { KunderComponent } from './kunder.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerService } from '../customer.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('KunderComponent', () => {
  let component: KunderComponent;
  let fixture: ComponentFixture<KunderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule, MatMenuModule, MatInputModule, RouterTestingModule, BrowserAnimationsModule, MatListModule, MatDividerModule, MatSelectModule, MatExpansionModule, MatFormFieldModule, FormsModule,],
      declarations: [ KunderComponent ],
      providers: [CustomerService, KunderComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KunderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', 
  inject([KunderComponent], (service: KunderComponent) => {
    expect(service).toBeTruthy();
  }))
});
