import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InleveransComponent } from './inleverans.component';

describe('InleveransComponent', () => {
  let component: InleveransComponent;
  let fixture: ComponentFixture<InleveransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InleveransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InleveransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
