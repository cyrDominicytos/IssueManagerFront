import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UserService } from 'src/app/demo/service/user.service';
import { User } from '../../api/User';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './user-list.component.html',
    providers: [MessageService, ConfirmationService]
})
export class UserListComponent implements OnInit {
    users: User[] = [];
    
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

    constructor(private customerService: CustomerService, private productService: ProductService, public userService: UserService, private notifService: MessageService) { }

    ngOnInit() {

        
        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];

        this.getUsers();
    }

    async getUsers() {
          await this.userService.getUsers().subscribe(data => {
            this.users = data as User[];
            console.log("data", data)
            console.log("Users2", this.users[0].name);
            this.loading = false;
          });            
    }
    async deleteUser(id: number) {
          // this.users = this.users.filter(x => x.id !== id);
          if(id==this.userService.user.id)
          {
            this.notification("Vous ne pouvez pas supprimer cet utilisateur !", "error");
          }else{
            await this.userService.delete(id).subscribe(data => {
                this.getUsers();
                this.notification("Utilisateur supprimé avec succès !")
              }, error=>{
                console.log("error code", error.status)
                switch (error.status) {
                    case 404:
                        this.notification("Il semble que cet utilisateur n'existe pas !", "error")
                        break;
                    case 403:
                        this.notification("Ce utilisateur ne peut être supprimé car il possède de ticket !", "error")
                        break;
                    default:
                        this.notification("Erreur serveur, assurez-vous que votre serveur est bien en marche", "error")
                        break;
                }
              });    
          }            
    }

    notification(message: string, type="success"){
        this.notifService.add({ key: 'tst', severity: type, summary: 'Success Message', detail: message});
        console.log("notif");
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