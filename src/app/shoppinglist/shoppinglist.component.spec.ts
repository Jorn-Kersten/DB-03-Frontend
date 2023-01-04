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
        ShoppinglistComponent
      ],
      providers: [
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ShoppinglistComponent);

    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('shopping list products should be defined', () => {
    const fixture = TestBed.createComponent(ShoppinglistComponent);

    const app = fixture.componentInstance;

    expect(app.shoppingListProducts).toBeDefined();
  });
});
