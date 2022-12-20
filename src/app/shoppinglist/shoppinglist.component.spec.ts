import { TestBed } from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppComponent} from "../app.component";
import {IndexComponent} from "../index/index.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {ShoppinglistComponent} from "./shoppinglist.component";
import {AppModule} from "../app.module";
import {ShoppingListProduct} from "./ShoppingListProduct";
import {FormGroup} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {UserComponent} from "../user/user.component";

describe('ShoppinglistComponent', () => {
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
        UserComponent
      ],
      providers: [
        IndexComponent,
        NavbarComponent,
        ShoppinglistComponent,
        UserComponent
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ShoppinglistComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    console.log("Should render the app (shoppinglist component)");
  });

  // it('should render 2 components', () => {
  //   const fixture = TestBed.createComponent(ShoppinglistComponent);
  //   const products = [
  //     {id: 1, shoppingListId: 1, userId: 1, quantity: 1, content: 1.5, name: 'Coca-cola', superMarket: 'Jumbo', url: 'https://www.jumbo.com/producten/coca-cola-original-taste-1,5l-428483FLS', date: '2022-10-12', price: 2.43},
  //     {id: 2, shoppingListId: 1, userId: 1, quantity: 1, content: 1.5, name: 'Fanta', superMarket: 'Jumbo', url: 'https://www.jumbo.com/producten/fanta-orange-pet-fles-1,5l-428478FLS', date: '2022-10-12', price: 2.25}
  //   ];
  //   const shopppingList = fixture.componentInstance;
  //   shopppingList.shoppingListProducts = products;
  //   shopppingList.createFormGroups();
  //   fixture.detectChanges();
  //   console.log(shopppingList.shoppingListProducts);
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   console.log("test "+ compiled.querySelector('ng-star-inserted'));
  //   expect(compiled.querySelectorAll('mat-expansion-panel').length).toBe(2);
  // })
});
