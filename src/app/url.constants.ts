import {HttpHeaders} from "@angular/common/http";

export const API_HEADERS = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      Authorization: ''
    }
  )
};
