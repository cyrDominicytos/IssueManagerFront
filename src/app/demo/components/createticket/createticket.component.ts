import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
import { TagService } from '../../service/tag.service';
import { TicketService } from '../../service/ticket.service';
import { Tag, Ticket } from '../../api/Ticket';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './createticket.component.html'
})
export class CreateTicketComponent implements OnInit {
    tags: Tag[] = [];
    ticket: Ticket = {
        "id":0,
        "title":"SFH3",
        "content":"",
        "state":"CREATED",
        "user":{"id":0,"name":"","email":"","role":"","created_at":""},
        "created_at":"",
        "tags":[]
    };
    ticketId: number = 0;
    types: any[] = [];
    selectedType: any  = {};
    
    countries: any[] = [];

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];

    valSlider = 50;

    valColor = '#424242';

    valRadio: string = '';

    valCheck: string[] = [];

    valCheck2: boolean = false;

    valSwitch: boolean = false;

    cities: SelectItem[] = [];

    selectedList: SelectItem = { value: '' };

    selectedDrop: SelectItem = { value: '' };

    selectedMulti: any[] = [];

    valToggle = false;

    paymentOptions: any[] = [];

    valSelect1: string = "";

    valSelect2: string = "";

    valueKnob = 20;

    constructor(private countryService: CountryService, private tagService: TagService,private ticketService: TicketService, private router: Router, private notifService: MessageService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.getTags();
        const oldId = this.route.snapshot.paramMap.get('id') as any as number;
        if(oldId>0)
            this.getTicket(oldId);

        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });

        this.types = [
            { label: 'Fonctionnalité', id: 1 },
            { label: 'Bug', id: 2 },
            { label: 'Question', id: 3 },

        ];

        this.cities = [
            { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
            { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
            { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
        ];

        this.paymentOptions = [
            { name: 'Option 1', value: 1 },
            { name: 'Option 2', value: 2 },
            { name: 'Option 3', value: 3 }
        ];
    }

    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        this.filteredCountries = filtered;
    }

     //load ticket list 
     async getTags() {
       
        if(this.tagService.tags.length == 0)
        {
            console.log("Loading tags...")
            await this.tagService.getTags().subscribe(data => {
                this.tags = data as Tag[];
                //store the loaded tickets in service
                this.tagService.tags = this.tags;
                console.log("tags", data)
                //this.filterTicketsState();
              }); 
        }else{
            //return an existing tags (don't need to perform server-side request)
            this.tags = this.tagService.tags;
        }
                   
    }

    saveTicket(){
        console.log("saveTicket Called")
        const data = {
            "content": this.ticket.content,
            "user_id": 1,
            "title": this.ticket.title,
            "tagsId": this.ticket.tags.map(t => t.id)
          }
        this.ticketService.addTicket(data).subscribe(data =>{
           this.goToTicketListRoute(true);
        })
        
    }
    updateTicket(){
        console.log("updateTicket Called")
        const data = {
            "content": this.ticket.content,
            "user_id": 1,
            "title": this.ticket.title,
            "tagsId": this.ticket.tags.map(t => t.id)
          }
        this.ticketService.updateTicket(data, this.ticket.id).subscribe(data =>{
           this.goToTicketListRoute(true);
        })
        
    }

    async getTicket(id:number){
        //load ticket details
        let t = await this.ticketService.getTicketById(id);
        if(t!=null) {
            this.ticket = t;
        }
        else 
            this.router.navigate(['/tickets']);
        
     }

     goToTicketListRoute(reload: boolean, message="Nouveau ticket créé !") {
        const navigationExtras: NavigationExtras = {
          state: {
            reload: reload,
            message: message
          }
        };
        this.router.navigate(['/tickets'], navigationExtras);
      }
    notification(message: string, type="success"){
        this.notifService.add({ key: 'tst', severity: type, summary: 'Success Message', detail: message});
        console.log("notif");
    }

    submitTicket(){
        //submit ticket here ...
        if(parseInt(this.ticket.id+"") <= 0){
            //save ticket
            this.saveTicket();
        }else{
            //update ticket
            this.updateTicket();
        }
    }
}
