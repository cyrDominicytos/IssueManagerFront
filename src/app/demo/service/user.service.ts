import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

      getUsers() {
        return this.http.get('http://localhost:8080/users');

      }

     
}
