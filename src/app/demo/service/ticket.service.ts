import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ticket } from '../api/Ticket';
import { Observable, of } from 'rxjs';

@Injectable()
export class TicketService {
    tickets: Ticket[] = [];
    ticket!:  Ticket;
    constructor(private http: HttpClient) { }

       getTickets(refresh = false) {
        if (!refresh && this.tickets.length>0)
          return of(this.tickets);
        else{
          console.log("new load")
           return this.http.get(environment.apiBaseUrl+'tickets');
        }
      }

       getTicketById(id:number, refresh = false) {
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
      }

      //save new tiket
      addTicket(data:any){
        console.log("add_tikcet", data)
        return this.http.post(environment.apiBaseUrl+'tickets', data);
      }

      //update tiket
      updateTicket(data:any, id:number){
        console.log("update_tikcet", data)
        return this.http.put(environment.apiBaseUrl+'tickets/'+id, data);
      }
}
