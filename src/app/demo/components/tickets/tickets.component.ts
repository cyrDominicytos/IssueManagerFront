import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TicketService } from 'src/app/demo/service/ticket.service';
import { Ticket } from '../../api/Ticket';
import { ActivatedRoute } from '@angular/router';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tickets.component.html',
    providers: [MessageService, ConfirmationService]
})
export class TicketsComponent implements OnInit {
    
    tickets: Ticket[] = [];
    displayTickets: Ticket[] = [];
    ticketStates: any[] = [];

    filterState: any = "";

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

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private customerService: CustomerService, private productService: ProductService, private ticketService: TicketService, private route: ActivatedRoute, private notifService: MessageService) { }

    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            
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

        this.ticketStates = [
            { name: 'Ouvert', value: 1 },
            { name: 'Fermé', value: 2 }
        ];
   
        this.getTickets();
        this.notification();
    }

    //load ticket list 
    async getTickets() {

        if(this.ticketService.tickets.length == 0 || history.state.reload == true)
        {
            console.log("Loading tickets... yes")
            await this.ticketService.getTickets(true).subscribe(data => {
                this.tickets = data as Ticket[];
                //store the loaded tickets in service
                this.ticketService.tickets = this.tickets;
                console.log("tickets", data)
                this.loading = false;
                this.filterTicketsState();
              }); 
        }else{
            this.tickets = this.ticketService.tickets;
            this.loading = false;
            console.log("cached data", this.tickets)
            this.filterTicketsState();
        }
                   
    }

    filterTicketsState(){
        if(this.filterState.length==0 || this.filterState.length==2)
        {
           this.displayTickets =  this.tickets;
            //display all tickets
        }else if(this.filterState[0].name =="Ouvert"){
            //display only opened tickets
            this.displayTickets =  this.tickets.filter(t=> t.state==="CREATED");
        }else{
            //display only closed tickets
            this.displayTickets =  this.tickets.filter(t=> t.state==="CLOSED");
        }
    }
    notification(type="success"){
       if(history.state.reload === true){
        //alert(history.state.reload)
            history.state.reload = null
           // alert(history.state.reload)
            console.log("should notify success operation !", history.state.reload)
        this.notifService.add({ key: 'tst', severity: type, summary: 'Success Message', detail: history.state.message});
       }
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