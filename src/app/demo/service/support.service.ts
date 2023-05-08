import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Support } from '../api/Ticket';
import { Observable, of } from 'rxjs';

@Injectable()
export class SupportService {
    constructor(private http: HttpClient) { }

       //Load 
       getAvailableSupports(ticketId:number) {
           return this.http.get(environment.apiBaseUrl+'supports/availables/'+ticketId);
      }    
}
