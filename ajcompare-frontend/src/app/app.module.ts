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

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent
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
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
