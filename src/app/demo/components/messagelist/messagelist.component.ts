import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { UserService } from 'src/app/demo/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Support, Ticket } from '../../api/Ticket';
import { TicketService } from '../../service/ticket.service';
import { SupportService } from '../../service/support.service';
import { MessagesService } from '../../service/message.service';
import { Message } from '../../api/Message';



interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './messagelist.component.html',
    providers: [MessagesService, ConfirmationService]
})
export class MessageListComponent implements OnInit {
    ticketId: number = 0;
    ticket: Ticket = {
        "id":0,
        "title":"",
        "content":"",
        "state":"CREATED",
        "user":{"id":0,"name":"","email":"","role":"","created_at":""},
        "created_at":"",
        "tags":[],
        "assignedSupports":[]
    };

    messages: Message[] = [];
    users: any[] = [];
    availableSupport: Support[] = [];
    selectedSupport: Support[] = [];
    loading: boolean = true;
    loadingMessage: boolean = true;
    comment: string = "";
    valToggle: boolean = true;

    statuses: any[] = [];

    @ViewChild('filter') filter!: ElementRef;
    constructor(private route: ActivatedRoute, private router: Router, private ticketService: TicketService, private messageService: MessagesService, public userService: UserService, private supportService: SupportService) { }

    ngOnInit() {
        this.ticketId = this.route.snapshot.paramMap.get('id') as any as number;
        this.getTicket(true);
    }

    async getTicket(reload=false){
       //load ticket details
       let t = await this.ticketService.getTicketById(this.ticketId, reload);
       if(t!=null) {
           this.ticket = t;
           this.valToggle = t.state=="CREATED" ? false: true;
           if(reload){
               this.getTicketMessages();
               this.getSupports()
           }
       }
       else 
            this.router.navigate(['/tickets']); 
    }

    async getTicketMessages() {
        console.log("Loading messages...")
         //load ticket messages (take it in service storage if it's already loaded or perfom server-side request to load it)
         await this.messageService.getTicketMessages(this.ticketId).subscribe((data) => {
            this.messages = data as Message[];
            this.loadingMessage = false;
            this.comment = "";
            });  
    }

     //load available supports 
     async getSupports() {
            console.log("Loading supports...")
            await this.supportService.getAvailableSupports(this.ticket.id).subscribe(data => {
                this.availableSupport = data as Support[];
                console.log("supports", data)
              });           
    }

    submitComment(){
        //submit comment
        const data = {
            "content": this.comment,
            "ticketId": this.ticketId,
            "userId": this.userService.user.id
          }
        this.messageService.addMessage(data).subscribe((data: any) =>{
            this.getTicketMessages();
        })
        
    }
    submitAssignedSupports(){
        //affect ticket to a support
        console.log("assign", this.selectedSupport);
        const ids = this.selectedSupport.map(item => item.id);
        this.ticketService.addSupports(ids, this.ticket.id).subscribe((data: any) =>{
            this.getTicket(true);
        })
    }

    openOrCloseTicket(){
        this.ticketService.changeState(this.ticket.id).subscribe((data: any) =>{
            this.ticket.state = this.ticket.state=="CREATED" ? "CLOSED" : "CREATED";
        })
    }
     
    displayTicketStatus(str: string){
        return str=="CREATED" ? "Ouvert" : "Fermé";
    }    
}