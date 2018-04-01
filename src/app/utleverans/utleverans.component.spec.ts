import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtleveransComponent } from './utleverans.component';

describe('UtleveransComponent', () => {
  let component: UtleveransComponent;
  let fixture: ComponentFixture<UtleveransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtleveransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtleveransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
