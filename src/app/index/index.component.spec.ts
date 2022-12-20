import { TestBed } from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppComponent} from "../app.component";
import {IndexComponent} from "./index.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {ShoppinglistComponent} from "../shoppinglist/shoppinglist.component";
import {AppModule} from "../app.module"

describe('IndexComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AppModule,

      ],
      declarations: [
        AppComponent,
        IndexComponent,
        NavbarComponent,
        ShoppinglistComponent,
      ],
      providers: [
        IndexComponent,
        NavbarComponent,
        ShoppinglistComponent
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a components', () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const products = [
      {id: 1, name: 'Coca-cola', supermarket: 'Albert Heijn', url: 'https://www.ah.nl/producten/product/wi2800/coca-cola-regular', date: '2022-10-12', price: 2.43},
      {id: 2, name: 'Fanta', supermarket: 'Albert Heijn', url: 'https://www.ah.nl/producten/product/wi2803/fanta-orange', date: '2022-10-12', price: 2.25},
      {id: 3, name: 'Coca-cola', supermarket: 'Jumbo', url: 'https://www.jumbo.com/producten/coca-cola-original-taste-1,5l-428483FLS', date: '2022-10-12', price: 2.43},
      {id: 4, name: 'Fanta', supermarket: 'Jumbo', url: 'https://www.jumbo.com/producten/fanta-orange-pet-fles-1,5l-428478FLS', date: '2022-10-12', price: 2.25}
    ];
    const index = fixture.componentInstance;
    index.products = products;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('mat-expansion-panel').length).toBe(4);
  })

  it('should render h1', () => {
    const fixture = TestBed.createComponent(IndexComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toEqual('AJcompare Home');
  });
});
