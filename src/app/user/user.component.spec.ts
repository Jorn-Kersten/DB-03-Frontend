import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {ShoppinglistComponent} from "../shoppinglist/shoppinglist.component";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(ShoppinglistComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });
});
