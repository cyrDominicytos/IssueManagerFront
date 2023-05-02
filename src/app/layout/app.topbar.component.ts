import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { User } from '../demo/api/User';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    menuItems: MenuItem[] = [];
    account:  MenuItem[] = [];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.menuItems = [
            {
                label: 'Save', icon: 'pi pi-fw pi-check'
            },
            {
                label: 'Update', icon: 'pi pi-fw pi-refresh'
            },
            {
                label: 'Delete', icon: 'pi pi-fw pi-trash'
            },
            {
                separator: true
            },
            {
                label: 'Home', icon: 'pi pi-fw pi-home'
            },
        ];

        this.account = [
            {
                label: 'Tickets',
                items: [
                    {
                        label: 'Ajouter',
                        icon: 'pi pi-fw pi-plus'
                    },
                    {
                        label: 'Lister',
                        icon: 'pi pi-fw pi-list'
                    }
                ]
            },
            {
                label: 'Utilisateurs',
                items: [
                    {
                        label: 'Ajouter',
                        icon: 'pi pi-fw pi-plus'
                    },
                    {
                        label: 'Lister',
                        icon: 'pi pi-fw pi-list'
                    }

                ]
            },
            {
                label: 'Profil',
                items: [
                    {
                        label: 'Editer',
                        icon: 'pi pi-fw pi-pencil',

                    },
                    {
                        label: 'Map',
                        icon: 'pi pi-fw pi-map-marker',

                    },
                    {
                        label: 'Connexion',
                        icon: 'pi pi-fw pi-pencil'
                    }
                ]
            }
        ];
    }

    get user(): User {
        //console.log("userSession",sessionStorage.getItem('user').name);
        //JSON.parse(sessionStorage.getItem('user')) as User
        let user = sessionStorage.getItem('user');
        if(user==null)
            return {"id":0,"name":"","email":"","role":"Visiteur","created_at":""};
        return  JSON.parse(user);
      }
}
