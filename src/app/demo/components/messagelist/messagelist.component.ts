import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { UserService } from 'src/app/demo/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../api/Ticket';
import { TicketService } from '../../service/ticket.service';
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
    ticket!: Ticket;
    messages: Message[] = [];
    users: any[] = [];
    availableSupport: any[] = [];
    selectedSupport: any[] = [];
    loading: boolean = true;
    loadingMessage: boolean = true;
    comment: string = "";
    valToggle: boolean = true;

    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

   

    @ViewChild('filter') filter!: ElementRef;

    constructor(private customerService: CustomerService, private productService: ProductService, private route: ActivatedRoute, private router: Router, private ticketService: TicketService, private messageService: MessagesService, public userService: UserService) { }

    ngOnInit() {
        this.ticketId = this.route.snapshot.paramMap.get('id') as any as number;
        this.getTicket();

        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;
            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
        this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];

    }

    async getTicket(reload=true){
       //load ticket details
       let t = await this.ticketService.getTicketById(this.ticketId);
       if(t!=null) {
           this.ticket = t;
           this.valToggle = t.state=="CREATED" ? false: true;
           if(reload)
           this.getTicketMessages();
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

    openOrCloseTicket(){
        this.ticketService.changeState(this.ticket.id).subscribe((data: any) =>{
            //this.getTicket(false);
            this.ticket.state = this.ticket.state=="CREATED" ? "CLOSED" : "CREATED";
        })
    }
     
    displayTicketStatus(str: string){
        return str=="CREATED" ? "Ouvert" : "Fermé";
    }
    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData?.representative?.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    }
                    else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    expandAll() {
        if (!this.isExpanded) {
            this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    
}