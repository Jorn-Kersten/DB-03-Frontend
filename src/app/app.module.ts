import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import { NavbarComponent } from './navbar/navbar.component';
import {MatTableModule} from "@angular/material/table";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from "@angular/material/icon";
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'shoppinglist', component: ShoppinglistComponent},
]



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    ShoppinglistComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatExpansionModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatDividerModule,
        MatListModule,
        MatTableModule,
        NgbModule,
        MatIconModule,
        RouterModule.forRoot(
          routes
        ),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
