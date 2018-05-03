import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { OrdersService } from '../orders.service'
import { UtleveransComponent } from './utleverans.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../customer.service';
import { TimeService } from '../time.service';
import { TransporterService } from '../transporter.service';



describe('UtleveransComponent', () => {
  let component: UtleveransComponent;
  let fixture: ComponentFixture<UtleveransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule, MatTableModule],
      declarations: [ UtleveransComponent ],
      providers: [HttpHandler, CustomerService, TimeService, TransporterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtleveransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should inject CustomerService', inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();
  }))


  it('should inject TransporterService', inject([TransporterService], (service: TransporterService) => {
    expect(service).toBeTruthy();
  }))

  it('should inject HttpHandler', inject([HttpHandler], (service: HttpHandler) => {
    expect(HttpHandler).toBeTruthy();
  }))


  it('updateSectionHeader should return expected', () => {
    const comp = component
    let expected = 'TEST'
    expect(comp.updateSectionHeader(expected)).toBe(expected)


  })

});
