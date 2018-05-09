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
      providers: [HttpHandler, CustomerService, TimeService, TransporterService, OrdersService, HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtleveransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  
  });

/*
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
 
 
  it('sortOrders() should sort orders and push to arrays', inject([OrdersService, HttpClient], (OrdersService: OrdersService, HttpClient: HttpClient) => {
    let allorders = OrdersService.getOrders()
    console.log('all',allorders)
    //expect(expected.length).toBe(120)
  }))
 
  
  it('sortOrders() should sort orders and push to arrays', inject([OrdersService, HttpClient], (OrdersService: OrdersService, HttpClient: HttpClient) => {
    component.ngOnInit()
 
    expect(component.customerList.length).toBe(1)
    expect(component.solsidan.length).toBe(84)
    expect(component.dannes.length).toBe(9)
    expect(component.bong.length).toBe(12)
  })) 
  */
});
