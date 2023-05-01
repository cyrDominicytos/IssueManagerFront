import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ticket } from '../api/Ticket';
import { Observable, of } from 'rxjs';
import { Message } from '../api/Message';

@Injectable()
export class MessagesService {
    messages: Message[][] = [];
    message!:  Message;
    constructor(private http: HttpClient) { }

      getTicketMessages(id:number, refresh = false)
      {
        return  this.http.get(environment.apiBaseUrl+'messages/ticket/'+id);
      }

      addMessage(data:any){
        console.log("add_message", data)
        return this.http.post(environment.apiBaseUrl+'messages', data);
      }
       /*getTicketMessages(id:number, refresh = false) {
        if (!refresh && this.messages.length>0){
          let i =  this.messages.findIndex(m => m.ticketId == id);
          if(i != -1)
             return  this.messages[i];
          return [];
          
        }
        else{
            this.http.get(environment.apiBaseUrl+'tickets/'+id).subscribe(data => {
              this.messages[id] = data as Message[];
            });
            return this.messages[id];
        }
      }*/
     
}
