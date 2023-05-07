import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { User } from '../demo/api/User';
import { UserService } from '../demo/service/user.service';
import { Router } from '@angular/router';


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

    constructor(public layoutService: LayoutService, public userService: UserService, private router: Router) { }

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

        if(this.userService.isLoggedIn){          
                this.account = [
                    {
                        label: 'Profil',
                        items: [
                        
                            {
                                label: 'Editer',
                                icon: 'pi pi-fw pi-plus',
                                url: '/#/auth/updateProfile/'+this.userService.user.id
                            }
                        ]
                    }
                ];
         }
    
    }

    logout(){
        this.userService.logout();
        this.router.navigate(['/tickets']);
    }
    get user(): User {
        return  this.userService.user;
      }

      change(){
        alert(11)
      }
}
