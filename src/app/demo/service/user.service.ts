import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

      getUsers() {
        return this.http.get(environment.apiBaseUrl+'users');

      }

     
}
