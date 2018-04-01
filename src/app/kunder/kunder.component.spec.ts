import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KunderComponent } from './kunder.component';

describe('KunderComponent', () => {
  let component: KunderComponent;
  let fixture: ComponentFixture<KunderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KunderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KunderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
