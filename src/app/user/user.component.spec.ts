import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {ShoppinglistComponent} from "../shoppinglist/shoppinglist.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppModule} from "../app.module";
import {UserService} from "./user.service";
import {IndexComponent} from "../index/index.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {AppComponent} from "../app.component";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

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
        IndexComponent,
        NavbarComponent,
        ShoppinglistComponent
      ]
    })
    .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    console.log("Should render the app (user component)");
  });
});
