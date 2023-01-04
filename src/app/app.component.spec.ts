import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {IndexComponent} from "./index/index.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {ShoppinglistComponent} from "./shoppinglist/shoppinglist.component";
import {AppModule} from "./app.module";
import {UserComponent} from "./user/user.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AppModule
      ],
      declarations: [
        AppComponent,
        IndexComponent,
        NavbarComponent
      ],
      providers: [
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it(`title should be 'AJcompare'`, () => {
    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.componentInstance;

    expect(app.title).toEqual('AJcompare');
  });
});
