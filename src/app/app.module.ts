import {APP_INITIALIZER, NgModule} from '@angular/core';
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
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {environment} from "../environments/environment";
import { UserComponent } from './user/user.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'shoppinglist', component: ShoppinglistComponent},
  {path: 'account', component: UserComponent}
]

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256',
        redirectUri: environment.keycloak.redirectUri,
        checkLoginIframe: false
      },
      shouldAddToken: (request) => {
        const { method } = request;

        const isGetRequest = 'GET' === method.toUpperCase();
        const acceptablePaths = ['/assets', '/api/*'];

        return !(isGetRequest && acceptablePaths);
      }
    }).then(success => console.log(`keycloak service is available.`)
    ).catch(ex => alert(`The keycloak service is temporarily unavailable. Please come back later. \nError: ${ex.error_description}`));
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    ShoppinglistComponent,
    UserComponent
  ],
    imports: [
        BrowserModule,
        KeycloakAngularModule,
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
        MatSnackBarModule,
    ],
  providers: [
      {
        provide: APP_INITIALIZER,
        useFactory: initializeKeycloak,
        multi: true,
        deps: [KeycloakService]
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
