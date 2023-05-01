import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tag } from '../api/Ticket';
import { Observable, of } from 'rxjs';

@Injectable()
export class TagService {
    tags: Tag[] = [];
   
    constructor(private http: HttpClient) { }

       //Load 
       getTags(refresh = false) {
        if (!refresh && this.tags.length>0)
          return of(this.tags);
        else{
           return this.http.get(environment.apiBaseUrl+'tags');
        }
      }

      /* getTicketById(id:number, refresh = false) {
        if (!refresh && this.tickets.length>0){
          let t =  this.tickets.filter(t => t.id==id);
          if(t.length>0)
             return  t[0];
          return null;
          
        }
        else{
            this.http.get(environment.apiBaseUrl+'tickets/'+id).subscribe(data => {
              this.ticket = data as Ticket;
            });
            return this.ticket;
        }
      }*/


    
}
