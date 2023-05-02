import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/demo/api/User';
import { UserService } from 'src/app/demo/service/user.service';

import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegisterComponent {

    user: User = {"id":0,"name":"","email":"","role":"User","created_at":""};
    grads: any[] = [];
    selectedGrad: any  = {};
    showClear: boolean = false;
    isAdminOrSupport: boolean = false;
    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public layoutService: LayoutService, private userService: UserService, private router: Router) { }

    submit(){
        if(this.user.role == "Support"){
             //Support account
            const data = {
                "name": this.user.name,
                "email": this.user.email,
                "password": "",
                "grad": this.selectedGrad
              };
            //support
            if(this.user.id==0){
                data.password = this.password;
                this.userService.addSupport(data).subscribe((data: any) =>{
                            
                })
            }else{
                 //update support
                if(this.password.length > 0)
                    data.password = this.password;
                this.userService.updateSupport(data, this.user.id).subscribe((data: any) =>{
                    sessionStorage.setItem('user', JSON.stringify(data));
                })
            }
            this.goUserListRoute();
        }else{
            //User account
            const data = {
                "name": this.user.name,
                "email": this.user.email,
                "password": ""
              };

            
            if(this.user.id == 0){
                //add simple user
                sessionStorage.removeItem("user");
                data.password = this.password;
                this.userService.addUser(data).subscribe((data: any) =>{
                    sessionStorage.setItem('user', JSON.stringify(data));
                })
            }else{
                 //update simple user
                if(this.password.length > 0)
                    data.password = this.password;
                this.userService.updateUser(data, this.user.id).subscribe((data: any) =>{
                    sessionStorage.setItem('user', JSON.stringify(data));
                })
            }

            this.goToTicketListRoute();
        }
        
    }

    goToTicketListRoute() {
        this.router.navigate(['/tickets']);
    }
    goUserListRoute() {
        this.router.navigate(['/users']);
    }
}
