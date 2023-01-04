import { TestBed } from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppComponent} from "../app.component";
import {IndexComponent} from "./index.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {ShoppinglistComponent} from "../shoppinglist/shoppinglist.component";
import {AppModule} from "../app.module"
import {UserComponent} from "../user/user.component";

describe('IndexComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AppModule,
      ],
      declarations: [
        IndexComponent
      ],
      providers: []
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(IndexComponent);

    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it(`should be logged out as default'`, () => {
    const fixture = TestBed.createComponent(IndexComponent);
    fixture.detectChanges()
    const app = fixture.componentInstance;

    expect(app.loggedIn).toEqual(false);
  });
});
