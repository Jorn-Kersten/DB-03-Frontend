import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./User";
import {API_HEADERS} from "../url.constants";
import {KeycloakService} from "keycloak-angular";

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
    this.setHeaders().then(r => console.log(r));
  }

  async setHeaders() {
    if (await this.keycloakService.getToken() != undefined) {
      API_HEADERS.headers = API_HEADERS.headers.set('Authorization', 'Bearer ' + await this.keycloakService.getToken());
      return "Success";
    }
    return "Logged out";
  }

  getUser(userName: string | undefined) {
    if(userName) {
      const url = '/api/user/'+userName+'';
      return this.http.get<User>(url, API_HEADERS);
    }
    return;
  }


  async addToDatabase(name: string | undefined, email: string | undefined) {
    if (name && email) {
      const url = '/api/user/register/';
      return this.http.post<any>(url, {headers: API_HEADERS.headers, name: name, email: email}).subscribe(data => console.log("added"))
    }
    return;
  }
}
